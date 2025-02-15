"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, X } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const exampleStories = [
  {
    id: 1,
    title: "Luna's Magical Garden Adventure",
    description: "Join Luna as she discovers a secret garden filled with talking flowers and friendly butterflies.",
    theme: "Nature",
    ageGroup: "3-5 years",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=500",
    content: `# Luna's Magical Garden Adventure

Once upon a time, there was a curious little girl named Luna who loved to explore her backyard. One morning, she discovered a tiny door hidden behind some ivy.

When she opened it, she found herself in the most magical garden she had ever seen! The flowers were all different colors of the rainbow, and to her amazement, they could talk!

"Welcome, Luna!" said a friendly pink rose. "We've been waiting for someone special like you to find our garden."

Luna spent the day learning about all the different plants from her new flower friends. The wise old oak tree taught her about the importance of growing strong roots, while the butterflies showed her how to dance with the wind.

As the sun began to set, Luna knew it was time to go home. But the flowers had one last gift for her – a magical seed to plant in her own garden.

"Remember," whispered the rose, "just like our garden, friendship and kindness can grow into something beautiful."

Luna went home with a happy heart, knowing she had found a magical place where she would always be welcome.

The End`
  },
  {
    id: 2,
    title: "Captain Max's Space Journey",
    description: "Follow Captain Max on an exciting journey through the stars to save a lost alien friend.",
    theme: "Space",
    ageGroup: "6-8 years",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&q=80&w=500",
    content: `# Captain Max's Space Journey

Captain Max sat in his cardboard rocket ship, dreaming of the stars. But this wasn't just any ordinary day – his space computer was beeping with an urgent message!

"Help! My spaceship crashed on the Moon of Three Rings!" The message was from Blip, an alien friend Max had met during his last space adventure.

Without hesitation, Max pressed the big red button on his dashboard. WHOOSH! His cardboard rocket transformed into a real spaceship, powered by imagination and stardust.

Through asteroid fields and past shooting stars, Max navigated his way to the Moon of Three Rings. He found Blip's crashed ship and, using his space tools and quick thinking, helped repair it.

"Thank you, Captain Max!" Blip chirped happily. "You've shown me that true friendship knows no boundaries – even in space!"

Together, they flew back to Earth, sharing stories and space snacks along the way. Max learned that sometimes the greatest adventures are the ones where we help others.

The End`
  },
  {
    id: 3,
    title: "The Dragon's Library",
    description: "Discover what happens when a young librarian meets a book-loving dragon.",
    theme: "Fantasy",
    ageGroup: "9-12 years",
    image: "https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?auto=format&fit=crop&q=80&w=500",
    content: `# The Dragon's Library

In the quiet town of Booksworth, Sarah was the youngest librarian anyone had ever seen. She loved books more than anything – until the day she met a dragon who loved them even more.

The dragon, whom she named Paige, had been secretly living in the library's basement, carefully reading books at night and always returning them to their proper places.

When Sarah discovered Paige, instead of being afraid, she was amazed to find all the books were organized by genre and alphabetical order – even better than before!

Together, they started a special nighttime book club. Children from all over town would come to hear Paige read stories, her gentle voice bringing the words to life while tiny flames danced above her head like floating candles.

They learned that sometimes the most unlikely friendships make the best stories of all.

The End`
  },
  {
    id: 4,
    title: "The Time-Traveling Teddy",
    description: "A magical teddy bear takes its owner on historical adventures through time.",
    theme: "Adventure",
    ageGroup: "6-8 years",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f77?auto=format&fit=crop&q=80&w=500",
    content: `# The Time-Traveling Teddy

Tommy's grandmother gave him an old teddy bear with a mysterious golden pocket watch around its neck. That night, when the clock struck midnight, something amazing happened.

The teddy bear came to life and introduced itself as Professor TimeFluff! With a twist of the pocket watch, they were suddenly transported through time.

They visited ancient Egypt, met dinosaurs, and even saw the first moon landing. Each adventure taught Tommy something new about history and courage.

But the most important lesson came when Professor TimeFluff showed Tommy his grandmother as a young girl, playing with the same teddy bear.

Tommy realized that the best adventures are the ones we share with others, across all of time.

The End`
  }
];

export default function Examples() {
  const [selectedStory, setSelectedStory] = useState<typeof exampleStories[0] | null>(null);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Example Stories</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Explore our collection of AI-generated stories to see the magic that awaits. Each story is unique and can be customized to your preferences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exampleStories.map((story) => (
          <Card key={story.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-all" onClick={() => setSelectedStory(story)}>
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
              <p className="text-muted-foreground mb-4">{story.description}</p>
              <div className="flex gap-2 mb-4">
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
                  {story.theme}
                </span>
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
                  {story.ageGroup}
                </span>
              </div>
              <Button className="w-full" variant="outline" onClick={() => setSelectedStory(story)}>
                <BookOpen className="mr-2 h-4 w-4" />
                Read Story
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedStory?.title}</span>
              <Button variant="ghost" size="icon" onClick={() => setSelectedStory(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert max-w-none mt-4">
            {selectedStory && <ReactMarkdown>{selectedStory.content}</ReactMarkdown>}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button variant="outline" onClick={() => setSelectedStory(null)}>
              Close
            </Button>
            <Button asChild>
              <Link href="/create">Create Your Own Story</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="text-center mt-12">
        <Button size="lg" asChild>
          <Link href="/create">Create Your Own Story</Link>
        </Button>
      </div>
    </div>
  );
}