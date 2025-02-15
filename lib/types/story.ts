export interface StoryParams {
  characterName: string;
  theme: string;
  ageGroup: string;
  length: number;
  language: string;
  mood: string;
}

export interface StoryResponse {
  story: string;
}

export interface StoryError {
  error: string;
}