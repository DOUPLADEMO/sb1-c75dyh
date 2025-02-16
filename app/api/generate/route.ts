import { NextResponse } from 'next/server';
import { generateStory, StoryPrompt } from '@/lib/openai';
import { storyFormSchema } from '@/lib/validations/story-form';
import { db, auth } from '../firebase';
import admin from 'firebase-admin';

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
      const validatedData = storyFormSchema.parse(body);

      const storyPrompt: StoryPrompt = {
        name: validatedData.characterName,
        age: 0, // Default value
        gender: '', // Default value
        characterType: '', // Default value
        personalityTraits: '', // Default value
        supportingCharacters: '', // Default value
        setting: '', // Default value
        specialLocations: '', // Default value
        storyType: validatedData.theme,
        morals: '', // Default value
        magicalElements: '', // Default value
        challenges: '', // Default value
        tone: validatedData.tone,
        favoriteDialogues: '', // Default value
        hobbies: '', // Default value
        realReferences: '', // Default value
        storyLength: `${validatedData.length} minutes`,
        illustrationStyle: validatedData.theme,
        musicStyle: '', // Default value
        additionalNotes: '' // Default value
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

      // Store the result in Firestore
      await db.collection("stories").add({
        authorUid: uid,
        story: story.content,
        imageUrl: story.imageUrl,
        prompt: story.prompt,
        authorName: user.displayName,
        createdAt: admin.firestore.Timestamp.now(),
      });

      return NextResponse.json({ story });

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

