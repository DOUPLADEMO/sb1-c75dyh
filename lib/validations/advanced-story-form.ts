import * as z from "zod";

export const advancedStoryFormSchema = z.object({
    characterName: z.string().min(2, "validation.nameMinLength"),
    age: z.string().min(0).max(18),
    gender: z.string().nonempty("validation.genderRequired"), // Make gender mandatory
    characterType: z.string().optional(),
    personalityTraits: z.string().optional(),
    supportingCharacters: z.string().optional(),
    setting: z.string().optional(),
    specialLocations: z.string().optional(),
    storyType: z.string().optional(),
    morals: z.string().optional(),
    magicalElements: z.string().optional(),
    challenges: z.string().optional(),
    tone: z.string().optional(),
    favoriteDialogues: z.string().optional(),
    hobbies: z.string().optional(),
    realReferences: z.string().optional(),
    storyLength: z.string().optional(),
    illustrationStyle: z.string().optional(),
    musicStyle: z.string().optional(),
    additionalNotes: z.string().optional(),
    length: z.string().optional(),
    language: z.string().optional(),
});

export type AdvancedStoryFormValues = z.infer<typeof advancedStoryFormSchema>;
