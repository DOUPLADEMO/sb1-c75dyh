import React from 'react';
import { Clock } from 'lucide-react';
import { capitalizeFirstLetter } from '../lib/utils';
import { useTranslations } from 'next-intl';

export function StoryHistory(story: any) {

  const t = useTranslations();

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('history.title')}</h2>
      <div className="space-y-4">
        <div
          key={story.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
        >
          {story.imageUrl && (
            <div className="w-full h-48 relative">
              <img
                src={story.imageUrl}
                alt={t('history.storyImage', { name: story.prompt.name })}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('history.storyTitle', { name: capitalizeFirstLetter(story.prompt.name) })}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(story.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="line-clamp-3">{story.content}</p>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}