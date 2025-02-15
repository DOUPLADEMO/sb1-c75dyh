export const THEMES = [
  { value: "adventure", label: "Adventure" },
  { value: "fantasy", label: "Fantasy" },
  { value: "nature", label: "Nature" },
  { value: "space", label: "Space" },
] as const;

export const AGE_GROUPS = [
  { value: "3-5", label: "3-5 years" },
  { value: "6-8", label: "6-8 years" },
  { value: "9-12", label: "9-12 years" },
] as const;

export const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "hungarian", label: "Hungarian" },
] as const;

export const MOODS = [
  { value: "playful", label: "Playful" },
  { value: "calming", label: "Calming" },
  { value: "educational", label: "Educational" },
  { value: "humorous", label: "Humorous" },
] as const;

export const STORY_LENGTH = {
  min: 5,
  max: 15,
  step: 1,
} as const;