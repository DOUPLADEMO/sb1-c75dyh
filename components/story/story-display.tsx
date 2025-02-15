import { Loader2, Download } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StoryDisplayProps {
  story: string | null;
  error: string | null;
  loading: boolean;
  storyImage?: string | null;
}

export function StoryDisplay({ story, error, loading, storyImage }: StoryDisplayProps) {
  const handleDownload = () => {
    if (!story) return;
    const blob = new Blob([story], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bedtime-story.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : story ? (
        <>
          {storyImage && (
            <Card className="overflow-hidden mb-6">
              <img 
                src={storyImage} 
                alt="Story illustration" 
                className="w-full h-64 object-cover"
              />
            </Card>
          )}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>{story}</ReactMarkdown>
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Story
            </Button>
          </div>
        </>
      ) : (
        <div className="text-muted-foreground text-center h-64 flex items-center justify-center">
          Your generated story will appear here
        </div>
      )}
    </div>
  );
}