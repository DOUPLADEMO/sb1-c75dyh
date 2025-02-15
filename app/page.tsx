"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Sparkles, Volume2, Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Magical Bedtime Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create personalized bedtime stories for your children using AI magic. Bring their imagination to life with custom characters, themes, and illustrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/create">Create Your Story</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/examples">View Examples</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    title: "AI-Powered Stories",
    description: "Unique stories generated based on your child's interests and preferences",
    icon: Sparkles,
  },
  {
    title: "Beautiful Illustrations",
    description: "AI-generated artwork that brings each story to life",
    icon: BookOpen,
  },
  {
    title: "Audio Narration",
    description: "Listen to stories with natural-sounding voices and background music",
    icon: Volume2,
  },
  {
    title: "Save & Share",
    description: "Download stories as PDFs or share them with family and friends",
    icon: Download,
  },
];