"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface Story {
    authorUid: string;
    story: string;
    imageUrl: string;
    prompt: string;
    authorName: string;
    createdAt: any;
}

const StoryPage = () => {
    const { user } = useAuthContext();
    const { t } = useTranslation();
    const router = useRouter();
    const { uuid } = useParams();
    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStory = async () => {
            if (!user || !uuid) return;

            const response = await fetch(`/api/my-stories/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${await user.getIdToken()}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStory(data.story);
            } else {
                console.error('Failed to fetch story');
            }

            setLoading(false);
        };

        fetchStory();
    }, [user, uuid]);

    if (loading) {
        return <div>{t('loading')}</div>;
    }

    if (!user) {
        return <div>{t('pleaseLogin')}</div>;
    }

    if (!story) {
        return <div>{t('storyNotFound')}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => router.back()} className="text-purple-600 hover:underline mb-4">
                {t('back')}
            </button>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image src={story.imageUrl} alt="Story Image" width={800} height={600} className="w-full h-96 object-cover" />
                <div className="p-4">
                    <ReactMarkdown className="">{story.story}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default StoryPage;
