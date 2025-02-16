import * as z from "zod";

export const advancedStoryFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.number().min(0).max(18),
    gender: z.enum(["male", "female", "nonBinary", "notSpecify"]),
    characterType: z.enum(["human", "animal", "robot", "fairy", "other"]),
    personalityTraits: z.string().optional(),
    supportingCharacters: z.string().optional(),
    setting: z.string().optional(),
    specialLocations: z.string().optional(),
    storyType: z.enum(["adventure", "friendship", "overcomingFear", "mystery", "other"]),
    morals: z.string().optional(),
    magicalElements: z.string().optional(),
    challenges: z.string().optional(),
    tone: z.enum(["funny", "calm", "exciting", "mysterious", "other"]),
    favoriteDialogues: z.string().optional(),
    hobbies: z.string().optional(),
    realReferences: z.string().optional(),
    storyLength: z.enum(["short", "medium", "long"]),
    illustrationStyle: z.enum(["bright", "dreamy", "other"]),
    musicStyle: z.string().optional(),
    additionalNotes: z.string().optional(),
});

export type AdvancedStoryFormValues = z.infer<typeof advancedStoryFormSchema>;
