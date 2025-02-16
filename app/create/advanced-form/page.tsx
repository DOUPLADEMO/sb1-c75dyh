"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AdvancedStoryForm } from "@/components/story/AdvancedStoryForm";
import { StoryDisplay } from "@/components/story/StoryDisplay";
import type { AdvancedStoryFormValues } from "@/lib/validations/advanced-story-form";
import { StoryResponse } from "@/lib/openai";
import { useAuthContext } from "@/context/AuthContext";

export default function CreateStory() {
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  async function onSubmit(values: AdvancedStoryFormValues) {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }
      const idToken = await user.getIdToken();
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
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
          <AdvancedStoryForm onSubmit={onSubmit} isLoading={loading} />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your Story</h2>
          <StoryDisplay
            story={story}
            error={error}
            loading={loading}
          />
        </Card>
      </div>
    </div>
  );
}