
import { VisionAnalysisResult } from '@/lib/types/story';
import { toast } from 'sonner';

// This service handles the communication with Google Cloud Vision API
const visionService = {
  analyzeImage: async (imageFile: File): Promise<VisionAnalysisResult> => {
    try {
      const base64Image = await fileToBase64(imageFile);
      const base64Data = base64Image.split(',')[1];

      toast.loading("Analyzing image...");

      const response = await fetch('http://localhost:3001/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Image: base64Data })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Analysis complete!");
      return parseVisionResponse({ responses: [data] });
    } catch (error) {
      console.error("Image analysis failed:", error);
      toast.error("Analysis failed.");
      return { error: "Failed to analyze image" };
    }
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Helper function to parse the Vision API response into our application format
const parseVisionResponse = (response: any): VisionAnalysisResult => {
  try {
    const results = response.responses[0];

    return {
      labels: results.labelAnnotations?.map((label: any) => ({
        description: label.description,
        score: label.score,
      })) || [],

      objects: results.localizedObjectAnnotations?.map((obj: any) => ({
        description: obj.name,
        score: obj.score,
        boundingPoly: {
          vertices: obj.boundingPoly.normalizedVertices
        }
      })) || [],

      faces: results.faceAnnotations || [],

      text: results.fullTextAnnotation ? results.fullTextAnnotation.text : "",

      safeSearch: results.safeSearchAnnotation ? {
        adult: results.safeSearchAnnotation.adult,
        spoof: results.safeSearchAnnotation.spoof,
        medical: results.safeSearchAnnotation.medical,
        violence: results.safeSearchAnnotation.violence,
        racy: results.safeSearchAnnotation.racy
      } : undefined
    };
  } catch (error) {
    console.error("Error parsing Vision API response:", error);
    return { error: "Error parsing analysis results" };
  }
};

export default visionService;
