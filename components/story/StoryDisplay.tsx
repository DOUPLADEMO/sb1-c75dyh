import { Loader2, Download, Share2 } from "lucide-react";
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { t } from "i18next";
import { downloadAsPDF, shareStory } from "@/lib/story-utils";
import { StoryResponse } from "@/lib/openai";

interface StoryDisplayProps {
  story: StoryResponse | null;
  error: string | null;
  loading: boolean;
}

export function StoryDisplay({ story, error, loading }: StoryDisplayProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    await shareStory(story?.content!);
  };

  const storyImage = story?.imageUrl;

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
              <Image
                src={storyImage}
                alt="Story illustration"
                layout="responsive"
                width={700}
                height={256}
                className="object-cover"
              />
            </Card>
          )}
          <div className="prose prose-sm max-w-none dark:prose-invert">

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {String(story.prompt)}
            </pre>

            <ReactMarkdown>{story.content}</ReactMarkdown>
          </div>
          <div className="flex justify-end gap-4 mt-6 border-t pt-4">
            <button
              onClick={() => downloadAsPDF(story.content, storyImage)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <Download className="w-4 h-4" />
              {t('actions.download')}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <Share2 className="w-4 h-4" />
              {t('actions.share')}
            </button>
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