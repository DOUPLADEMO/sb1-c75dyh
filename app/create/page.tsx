"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { StoryForm } from "@/components/story/story-form";
import { StoryDisplay } from "@/components/story/story-display";
import type { StoryFormValues } from "@/lib/validations/story";

export default function CreateStory() {
  const [story, setStory] = useState<string | null>(null);
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: StoryFormValues) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      setStory(data.story);
      if (data.imageUrl) {
        setStoryImage(data.imageUrl);
      }
    } catch (err) {
      setError('Failed to generate story. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-8">Create Your Story</h1>
          <StoryForm onSubmit={onSubmit} isLoading={loading} />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your Story</h2>
          <StoryDisplay 
            story={story} 
            error={error} 
            loading={loading} 
            storyImage={storyImage}
          />
        </Card>
      </div>
    </div>
  );
}