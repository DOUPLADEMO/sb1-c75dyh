"use client";

import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Story {
  id: string;
  authorUid: string;
  story: string;
  imageUrl: string;
  prompt: string;
  authorName: string;
  createdAt: any;
}

const MyStories = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      if (!user) return;

      const response = await fetch('/api/my-stories', {
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStories(data.stories);
      } else {
        console.error('Failed to fetch stories');
      }

      setLoading(false);
    };

    fetchStories();
  }, [user]);

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  if (!user) {
    return <div>{t('pleaseLogin')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('myStories')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={story.imageUrl} alt="Story Image" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <ReactMarkdown className="text-gray-700">{`${story.story.substring(0, 100)}...`}</ReactMarkdown>
              <Link href={`/my-stories/${story.id}`} className="text-purple-600 hover:underline mt-2 block">
                {t('readMore')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStories;
