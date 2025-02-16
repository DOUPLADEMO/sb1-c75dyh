import { NextResponse } from 'next/server';
import { generateStory, StoryPrompt } from '@/lib/openai';
import { db, auth } from '../firebase';
import admin from 'firebase-admin';
import { advancedStoryFormSchema } from '@/lib/validations/advanced-story-form';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

// Ensure Next.js does not attempt to statically optimize the route
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();

    try {
      const validatedData = advancedStoryFormSchema.parse(body);

      const storyPrompt: StoryPrompt = {
        characterName: validatedData.characterName,
        age: validatedData.age,
        gender: validatedData.gender,
        characterType: validatedData.characterType,
        personalityTraits: validatedData.personalityTraits,
        supportingCharacters: validatedData.supportingCharacters,
        setting: validatedData.setting,
        specialLocations: validatedData.specialLocations,
        storyType: validatedData.storyType,
        morals: validatedData.morals,
        magicalElements: validatedData.magicalElements,
        challenges: validatedData.challenges,
        tone: validatedData.tone,
        favoriteDialogues: validatedData.favoriteDialogues,
        hobbies: validatedData.hobbies,
        realReferences: validatedData.realReferences,
        storyLength: `${validatedData.length} minutes`, // Parse length to string format
        illustrationStyle: validatedData.illustrationStyle,
        musicStyle: validatedData.musicStyle,
        additionalNotes: validatedData.additionalNotes,
      };

      // Generate the story
      const story = await generateStory(storyPrompt, 'hu');

      if (!story) {
        throw new Error('No story content received');
      }

      // Get the current user from the request headers
      const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];
      if (!idToken) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const decodedToken = await auth.verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const user = await auth.getUser(uid);

      // Fetch the image from the URL
      const imageResponse = await fetch(story.imageUrl);
      const imageBuffer = await imageResponse.buffer();

      // Upload the image to Firebase Storage
      const bucketName = 'bedtimestories1-5f241.firebasestorage.app';

      const bucket = admin.storage().bucket(bucketName);
      const fileName = `stories/${uuidv4()}.png`;
      const file = bucket.file(fileName);
      await file.save(imageBuffer, {
        metadata: { contentType: 'image/png' },
      });

      // Get the public URL of the uploaded image
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });

      // Store the result in Firestore
      await db.collection("stories").add({
        authorUid: uid,
        story: story.content,
        imageUrl: url,
        prompt: story.prompt,
        authorName: user.displayName,
        createdAt: admin.firestore.Timestamp.now(),
      });

      return NextResponse.json({ story: { ...story, imageUrl: url } });

    } catch (validationError: any) {
      console.error('Validation error:', validationError);
      return NextResponse.json(
        { error: 'Invalid story parameters provided' },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('Error in generate route:', error);
    const errorMessage = error?.message || 'Failed to generate story';
    const statusCode = error?.status || 500;

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

