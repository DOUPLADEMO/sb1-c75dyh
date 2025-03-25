export interface StoryParams {
  characterName: string;
  theme: string;
  ageGroup: string;
  length: number;
  language: string;
  mood: string;
  gender: string;
  characterType: string;
  personalityTraits: string;
  supportingCharacters: string;
  setting: string;
  specialLocations: string;
  storyType: string;
  morals: string;
  magicalElements: string;
  challenges: string;
  tone: string;
  favoriteDialogues: string;
  hobbies: string;
  realReferences: string;
  storyLength: string;
  illustrationStyle: string;
  musicStyle: string;
  additionalNotes: string;

}

export interface StoryError {
  error: string;
}

export interface StoryResponse {
  content: string;
  imageUrl: string;
}


export interface VisionAnnotation {
  description: string;
  score: number;
  boundingPoly?: {
    vertices: Array<{
      x: number;
      y: number;
    }>;
  };
}

export interface VisionAnalysisResult {
  labels?: VisionAnnotation[];
  objects?: VisionAnnotation[];
  faces?: any[];
  text?: string;
  safeSearch?: {
    adult: string;
    spoof: string;
    medical: string;
    violence: string;
    racy: string;
  };
  error?: string;
}


export interface UploadedImage {
  file: File | null;
  preview: string;
}