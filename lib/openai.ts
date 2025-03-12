import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API key is missing');
}

export const openai = new OpenAI({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true,
});


export interface StoryPrompt {
  characterName?: string;
  age?: string;
  gender?: string;
  characterType?: string;
  personalityTraits?: string;
  supportingCharacters?: string;
  setting?: string;
  specialLocations?: string;
  storyType?: string;
  morals?: string;
  magicalElements?: string;
  challenges?: string;
  tone?: string;
  favoriteDialogues?: string;
  hobbies?: string;
  realReferences?: string;
  storyLength?: string;
  illustrationStyle?: string;
  musicStyle?: string;
  additionalNotes?: string;
}

export interface StoryResponse {
  content: string;
  imageUrl: string;
  prompt: string;
}

export async function enhanceImage(file: File): Promise<string> {
  const response = await openai.images.edit({
    image: file,
    prompt: "Transform the provided drawing into a high-quality, professional children’s book illustration. Maintain the original essence while refining the linework, enhancing details, and adding smooth, storybook-like shading. Use a vibrant and playful color palette that is warm, expressive, and engaging for young readers. Ensure soft, textured lighting and depth to create a whimsical atmosphere. Add subtle, imaginative background elements that complement the character and setting without overwhelming the main focal point.",
    n: 1,
    size: "1024x1024"
  });
  return response.data[0]?.url || "";
}

async function generateTitle(imageUrl: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system",
      content: "You are an expert at generating imaginative and fitting titles for children's book illustrations."
    }, {
      role: "user",
      content: `Generate a whimsical and creative title for a children's book illustration based on this image: ${imageUrl}`
    }],
    temperature: 0.7,
    max_tokens: 50
  });
  return response.choices[0]?.message.content || "A Magical Tale";
}

export async function generateStoryPromptFromImage(imageUrl: string): Promise<StoryPrompt> {
  const title = await generateTitle(imageUrl);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system",
      content: "You are an expert at creating detailed story prompts for children's stories based on images."
    }, {
      role: "user",
      content: `Generate a detailed story prompt for a children's story based on this image: ${imageUrl}. The title of the story is "${title}".`
    }],
    temperature: 0.7,
    max_tokens: 400
  });

  const storyPrompt = JSON.parse(response.choices[0]?.message.content || "{}");
  return storyPrompt;
}

async function generateImagePrompt(story: string, illustrationStyle: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system",
      content: "You are an expert at creating DALL-E image prompts. Create a single scene that captures the essence of the story. Focus on the main character and the most important visual elements. The prompt should be detailed but concise, under 100 words."
    }, {
      role: "user",
      content: `Create a DALL-E prompt for this children's story in ${illustrationStyle} style. Story: ${story}`
    }],
    temperature: 0.7,
    max_tokens: 150
  });

  return response.choices[0]?.message.content || "A magical children's story illustration";
}

async function generateImage(imagePrompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: imagePrompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
    style: "vivid"
  });

  return response.data[0]?.url || "";
}

export async function generateStory(prompt: StoryPrompt, currentLanguage: String): Promise<StoryResponse> {

  currentLanguage = currentLanguage || 'hu';
  // Fill in missing details in the story prompt

  // Ensure all fields are included as empty strings if undefined
  let completePrompt: StoryPrompt = {
    characterName: prompt.characterName || '',
    age: prompt.age || '',
    gender: prompt.gender || '',
    characterType: prompt.characterType || '',
    personalityTraits: prompt.personalityTraits || '',
    supportingCharacters: prompt.supportingCharacters || '',
    setting: prompt.setting || '',
    specialLocations: prompt.specialLocations || '',
    storyType: prompt.storyType || '',
    morals: prompt.morals || '',
    magicalElements: prompt.magicalElements || '',
    challenges: prompt.challenges || '',
    tone: prompt.tone || '',
    favoriteDialogues: prompt.favoriteDialogues || '',
    hobbies: prompt.hobbies || '',
    realReferences: prompt.realReferences || '',
    storyLength: prompt.storyLength || '',
    illustrationStyle: prompt.illustrationStyle || '',
    musicStyle: prompt.musicStyle || '',
    additionalNotes: prompt.additionalNotes || '',
  };
  completePrompt = await fillStoryPrompt(completePrompt);

  const systemPrompt = currentLanguage === 'hu'
    ? "Kreatív gyermekmese író vagy. Alkoss lebilincselő, kornak megfelelő esti meséket. A történetet magyar nyelven írd meg. Használj markdown formázást."
    : "You are a creative children's story writer. Create engaging, age-appropriate bedtime stories. Use markdown to format the story.";

  const storyResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system",
      content: systemPrompt
    }, {
      role: "user",
      content: `${currentLanguage === 'hu' ? 'Készíts egy' : 'Create a'} ${completePrompt.storyLength} ${currentLanguage === 'hu' ? 'hosszúságú esti mesét a következő részletekkel' : 'bedtime story with the following details'}:
                
                ${currentLanguage === 'hu' ? 'Főszereplő' : 'Main Character'}:
                - ${currentLanguage === 'hu' ? 'Név' : 'Name'}: ${completePrompt.characterName}
                - ${currentLanguage === 'hu' ? 'Életkor' : 'Age'}: ${completePrompt.age}
                - ${currentLanguage === 'hu' ? 'Nem' : 'Gender'}: ${completePrompt.gender}
                - ${currentLanguage === 'hu' ? 'Típus' : 'Type'}: ${completePrompt.characterType}
                - ${currentLanguage === 'hu' ? 'Személyiség' : 'Personality'}: ${completePrompt.personalityTraits}
                
                ${currentLanguage === 'hu' ? 'Mellékszereplők' : 'Supporting Characters'}: ${completePrompt.supportingCharacters}
                
                ${currentLanguage === 'hu' ? 'Helyszín' : 'Setting'}: ${completePrompt.setting}
                ${currentLanguage === 'hu' ? 'Különleges helyszínek' : 'Special Locations'}: ${completePrompt.specialLocations}
                
                ${currentLanguage === 'hu' ? 'Történet típusa' : 'Story Type'}: ${completePrompt.storyType}
                ${currentLanguage === 'hu' ? 'Tanulság' : 'Moral/Lesson'}: ${completePrompt.morals}
                
                ${currentLanguage === 'hu' ? 'Varázslatos elemek' : 'Magical Elements'}: ${completePrompt.magicalElements}
                ${currentLanguage === 'hu' ? 'Kihívások' : 'Challenges'}: ${completePrompt.challenges}
                
                ${currentLanguage === 'hu' ? 'Hangulat' : 'Tone'}: ${completePrompt.tone}
                ${currentLanguage === 'hu' ? 'Párbeszéd stílusa' : 'Dialogue Style'}: ${completePrompt.favoriteDialogues}
                
                ${currentLanguage === 'hu' ? 'Személyes elemek' : 'Personal Elements'}:
                - ${currentLanguage === 'hu' ? 'Hobbik' : 'Hobbies'}: ${completePrompt.hobbies}
                - ${currentLanguage === 'hu' ? 'Valós utalások' : 'Real-life References'}: ${completePrompt.realReferences}
                
                ${currentLanguage === 'hu' ? 'Stílus' : 'Style'}: ${completePrompt.illustrationStyle}
                
                ${currentLanguage === 'hu' ? 'További megjegyzések' : 'Additional Notes'}: ${completePrompt.additionalNotes}
                
                ${currentLanguage === 'hu'
          ? 'Készíts egy lebilincselő, pozitív és esti mesének megfelelő történetet. Tartsd 1000 szó alatt.'
          : 'Make the story engaging, positive, and perfect for bedtime. Keep it under 1000 words.'}`
    }],
    temperature: 0.7,
    max_tokens: 1500
  });

  const storyContent = storyResponse.choices[0]?.message.content || (currentLanguage === 'hu' ? "Egyszer volt, hol nem volt..." : "Once upon a time...");

  // Generate image prompt based on the story
  const imagePrompt = await generateImagePrompt(storyContent, completePrompt.illustrationStyle!);

  // Generate image using DALL-E
  const imageUrl = await generateImage(imagePrompt);

  return {
    content: storyContent,
    imageUrl,
    prompt: JSON.stringify(completePrompt)
  };
}

async function fillStoryPrompt(prompt: StoryPrompt): Promise<StoryPrompt> {


  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system",
      content: "You are an expert at creating detailed story prompts for children's stories. Fill in the missing details based on the given context."
    }, {
      role: "user",
      content: `Fill in the missing details for this story prompt: ${JSON.stringify(prompt)} and return a JSON object with the filled details. Be aware of format, need to parse the JSON object.`
    }],
    temperature: 0.7,
    response_format: { type: "json_object" }, // Explicitly request JSON format
    max_tokens: 400
  });
  const filledDetails = JSON.parse(response.choices[0]?.message.content || "{}");
  return { ...prompt, ...filledDetails };
}