import { NextResponse } from 'next/server';
import { generateStory, generateImage } from '@/lib/openai';
import { storyFormSchema } from '@/lib/validations/story';

// Remove edge runtime to ensure environment variables are accessible
// export const runtime = 'edge';

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
      
      // Generate the story
      const story = await generateStory(validatedData);
      
      if (!story) {
        throw new Error('No story content received');
      }

      // Generate an illustration for the story
      let imageUrl = null;
      try {
        const imagePrompt = `${validatedData.theme} story about ${validatedData.characterName}: ${story.split('\n')[0]}`;
        imageUrl = await generateImage(imagePrompt);
      } catch (imageError: any) {
        console.error('Failed to generate image:', imageError);
        // Continue without image if generation fails
      }
      
      return NextResponse.json({ story, imageUrl });
      
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