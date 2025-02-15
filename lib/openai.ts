import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API key is missing');
}

export const openai = new OpenAI({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: false
});

export async function generateStory(params: {
  characterName: string;
  theme: string;
  ageGroup: string;
  length: number;
  language: string;
  mood: string;
}) {
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const prompt = `Create a ${params.mood} bedtime story for a child in the ${params.ageGroup} age group.
The story should:
- Be about a character named ${params.characterName}
- Have a ${params.theme} theme
- Be appropriate for ${params.length} minutes of reading
- Be written in ${params.language}
- Include clear paragraph breaks
- Have a beginning, middle, and end
- Include a moral or lesson
- Be engaging and imaginative
- Use age-appropriate language and concepts
- Include vivid descriptions and dialogue
- End with a satisfying conclusion

Format the story in Markdown with:
- A title using # heading
- Clear paragraph breaks
- Proper punctuation and dialogue formatting`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative children's story writer who creates engaging, age-appropriate bedtime stories with rich imagery and memorable characters."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: 2000,
      presence_penalty: 0.2,
      frequency_penalty: 0.3,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No story content received from OpenAI');
    }

    return content;
  } catch (error: any) {
    console.error('Error generating story:', error);
    const errorMessage = error?.response?.data?.error?.message || error.message;
    throw new Error(`Story generation failed: ${errorMessage}`);
  }
}

export async function generateImage(prompt: string) {
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A child-friendly, colorful illustration for a children's story: ${prompt}`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error('No image URL received from OpenAI');
    }

    return imageUrl;
  } catch (error: any) {
    console.error('Error generating image:', error);
    const errorMessage = error?.response?.data?.error?.message || error.message;
    throw new Error(`Image generation failed: ${errorMessage}`);
  }
}