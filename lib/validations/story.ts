import * as z from "zod";
import { THEMES, AGE_GROUPS, LANGUAGES, MOODS } from "@/lib/constants/story-options";

export const storyFormSchema = z.object({
  characterName: z.string().min(2, "Name must be at least 2 characters"),
  theme: z.enum([THEMES[0].value, ...THEMES.slice(1).map(t => t.value)]),
  ageGroup: z.enum([AGE_GROUPS[0].value, ...AGE_GROUPS.slice(1).map(g => g.value)]),
  length: z.number().min(5).max(15),
  language: z.enum([LANGUAGES[0].value, ...LANGUAGES.slice(1).map(l => l.value)]),
  mood: z.enum([MOODS[0].value, ...MOODS.slice(1).map(m => m.value)]),
});

export type StoryFormValues = z.infer<typeof storyFormSchema>;