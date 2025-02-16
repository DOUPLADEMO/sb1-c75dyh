import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API key is missing');
}

export const openai = new OpenAI({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: false,
});


export interface StoryPrompt {
  name?: string;
  age?: number;
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
  illustrationStyle: string;
  musicStyle?: string;
  additionalNotes?: string;
}

export interface StoryResponse {
  content: string;
  imageUrl: string;
  prompt: string;
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

export async function generateStory(_prompt: StoryPrompt, currentLanguage: String): Promise<StoryResponse> {

  currentLanguage = currentLanguage || 'hu';
  // Fill in missing details in the story prompt
  const prompt: StoryPrompt = await fillStoryPrompt(_prompt);


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
      content: `${currentLanguage === 'hu' ? 'Készíts egy' : 'Create a'} ${prompt.storyLength} ${currentLanguage === 'hu' ? 'hosszúságú esti mesét a következő részletekkel' : 'bedtime story with the following details'}:
                
                ${currentLanguage === 'hu' ? 'Főszereplő' : 'Main Character'}:
                - ${currentLanguage === 'hu' ? 'Név' : 'Name'}: ${prompt.name}
                - ${currentLanguage === 'hu' ? 'Életkor' : 'Age'}: ${prompt.age}
                - ${currentLanguage === 'hu' ? 'Nem' : 'Gender'}: ${prompt.gender}
                - ${currentLanguage === 'hu' ? 'Típus' : 'Type'}: ${prompt.characterType}
                - ${currentLanguage === 'hu' ? 'Személyiség' : 'Personality'}: ${prompt.personalityTraits}
                
                ${currentLanguage === 'hu' ? 'Mellékszereplők' : 'Supporting Characters'}: ${prompt.supportingCharacters}
                
                ${currentLanguage === 'hu' ? 'Helyszín' : 'Setting'}: ${prompt.setting}
                ${currentLanguage === 'hu' ? 'Különleges helyszínek' : 'Special Locations'}: ${prompt.specialLocations}
                
                ${currentLanguage === 'hu' ? 'Történet típusa' : 'Story Type'}: ${prompt.storyType}
                ${currentLanguage === 'hu' ? 'Tanulság' : 'Moral/Lesson'}: ${prompt.morals}
                
                ${currentLanguage === 'hu' ? 'Varázslatos elemek' : 'Magical Elements'}: ${prompt.magicalElements}
                ${currentLanguage === 'hu' ? 'Kihívások' : 'Challenges'}: ${prompt.challenges}
                
                ${currentLanguage === 'hu' ? 'Hangulat' : 'Tone'}: ${prompt.tone}
                ${currentLanguage === 'hu' ? 'Párbeszéd stílusa' : 'Dialogue Style'}: ${prompt.favoriteDialogues}
                
                ${currentLanguage === 'hu' ? 'Személyes elemek' : 'Personal Elements'}:
                - ${currentLanguage === 'hu' ? 'Hobbik' : 'Hobbies'}: ${prompt.hobbies}
                - ${currentLanguage === 'hu' ? 'Valós utalások' : 'Real-life References'}: ${prompt.realReferences}
                
                ${currentLanguage === 'hu' ? 'Stílus' : 'Style'}: ${prompt.illustrationStyle}
                
                ${currentLanguage === 'hu' ? 'További megjegyzések' : 'Additional Notes'}: ${prompt.additionalNotes}
                
                ${currentLanguage === 'hu'
          ? 'Készíts egy lebilincselő, pozitív és esti mesének megfelelő történetet. Tartsd 1000 szó alatt.'
          : 'Make the story engaging, positive, and perfect for bedtime. Keep it under 1000 words.'}`
    }],
    temperature: 0.7,
    max_tokens: 1500
  });

  const storyContent = storyResponse.choices[0]?.message.content || (currentLanguage === 'hu' ? "Egyszer volt, hol nem volt..." : "Once upon a time...");

  // Generate image prompt based on the story
  const imagePrompt = await generateImagePrompt(storyContent, prompt.illustrationStyle);

  // Generate image using DALL-E
  const imageUrl = await generateImage(imagePrompt);

  return {
    content: storyContent,
    imageUrl,
    prompt: JSON.stringify(prompt)
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