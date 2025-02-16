"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from 'next-intl';
import { advancedStoryFormSchema, type AdvancedStoryFormValues } from "@/lib/validations/advanced-story-form";

interface AdvancedStoryFormProps {
  onSubmit: (values: AdvancedStoryFormValues) => Promise<void>;
  isLoading: boolean;
}

export function AdvancedStoryForm({ onSubmit, isLoading }: AdvancedStoryFormProps) {
  const t = useTranslations();
  const form = useForm<AdvancedStoryFormValues>({
    resolver: zodResolver(advancedStoryFormSchema),
    defaultValues: {
      characterName: '',
      age: '5',
      gender: undefined,
      characterType: 'human',
      personalityTraits: '',
      supportingCharacters: '',
      setting: '',
      specialLocations: '',
      storyType: 'adventure',
      morals: '',
      magicalElements: '',
      challenges: '',
      tone: 'exciting',
      favoriteDialogues: '',
      hobbies: '',
      realReferences: '',
      storyLength: 'medium',
      illustrationStyle: 'bright',
      musicStyle: '',
      additionalNotes: ''
    },
  });

  const handleSubmit = async (values: AdvancedStoryFormValues) => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
      <div className="space-y-8">
        {/* Main Character Details - Required */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('form.mainCharacter')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.characterName')} *
              </label>
              <input
                type="text"
                id="name"
                {...form.register("characterName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {form.formState.errors.characterName && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.characterName.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.age')} *
              </label>
              <input
                type="number"
                id="age"
                {...form.register("age")}
                min="0"
                max="18"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {form.formState.errors.age && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.age.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.gender.label')} *
              </label>
              <select
                id="gender"
                {...form.register("gender")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('form.gender.options.select')}</option>
                <option value="male">{t('form.gender.options.male')}</option>
                <option value="female">{t('form.gender.options.female')}</option>
                <option value="nonBinary">{t('form.gender.options.nonBinary')}</option>
                <option value="notSpecify">{t('form.gender.options.notSpecify')}</option>
              </select>
              {form.formState.errors.gender && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.gender.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="characterType" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.characterType.label')} *
              </label>
              <select
                id="characterType"
                {...form.register("characterType")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('form.characterType.options.select')}</option>
                <option value="human">{t('form.characterType.options.human')}</option>
                <option value="animal">{t('form.characterType.options.animal')}</option>
                <option value="robot">{t('form.characterType.options.robot')}</option>
                <option value="fairy">{t('form.characterType.options.fairy')}</option>
                <option value="other">{t('form.characterType.options.other')}</option>
              </select>
              {form.formState.errors.characterType && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.characterType.message)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Optional Sections */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('form.personalityTraits.label')}</h3>
          <textarea
            id="personalityTraits"
            {...form.register("personalityTraits")}
            placeholder={t('form.personalityTraits.placeholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
          {form.formState.errors.personalityTraits && (
            <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.personalityTraits.message)}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('form.setting.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.setting.label')}
              </label>
              <input
                type="text"
                id="setting"
                {...form.register("setting")}
                placeholder={t('form.setting.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {form.formState.errors.setting && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.setting.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="specialLocations" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.specialLocations.label')}
              </label>
              <input
                type="text"
                id="specialLocations"
                {...form.register("specialLocations")}
                placeholder={t('form.specialLocations.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {form.formState.errors.specialLocations && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.specialLocations.message)}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('form.storyElements.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="storyType" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.storyElements.type.label')}
              </label>
              <select
                id="storyType"
                {...form.register("storyType")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('form.storyElements.type.options.select')}</option>
                <option value="adventure">{t('form.storyElements.type.options.adventure')}</option>
                <option value="friendship">{t('form.storyElements.type.options.friendship')}</option>
                <option value="overcomingFear">{t('form.storyElements.type.options.overcomingFear')}</option>
                <option value="mystery">{t('form.storyElements.type.options.mystery')}</option>
                <option value="other">{t('form.storyElements.type.options.other')}</option>
              </select>
              {form.formState.errors.storyType && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.storyType.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.storyElements.tone.label')}
              </label>
              <select
                id="tone"
                {...form.register("tone")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('form.storyElements.tone.options.select')}</option>
                <option value="funny">{t('form.storyElements.tone.options.funny')}</option>
                <option value="calm">{t('form.storyElements.tone.options.calm')}</option>
                <option value="exciting">{t('form.storyElements.tone.options.exciting')}</option>
                <option value="mysterious">{t('form.storyElements.tone.options.mysterious')}</option>
                <option value="other">{t('form.storyElements.tone.options.other')}</option>
              </select>
              {form.formState.errors.tone && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.tone.message)}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('form.personalDetails.title')}</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.personalDetails.hobbies.label')}
              </label>
              <input
                type="text"
                id="hobbies"
                {...form.register("hobbies")}
                placeholder={t('form.personalDetails.hobbies.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {form.formState.errors.hobbies && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.hobbies.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="realReferences" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.personalDetails.realReferences.label')}
              </label>
              <textarea
                id="realReferences"
                {...form.register("realReferences")}
                placeholder={t('form.personalDetails.realReferences.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
              />
              {form.formState.errors.realReferences && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.realReferences.message)}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('form.preferences.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="storyLength" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.preferences.length.label')}
              </label>
              <select
                id="storyLength"
                {...form.register("storyLength")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="short">{t('form.preferences.length.options.short')}</option>
                <option value="medium">{t('form.preferences.length.options.medium')}</option>
                <option value="long">{t('form.preferences.length.options.long')}</option>
              </select>
              {form.formState.errors.storyLength && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.storyLength.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="illustrationStyle" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.preferences.illustration.label')}
              </label>
              <select
                id="illustrationStyle"
                {...form.register("illustrationStyle")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="bright">{t('form.preferences.illustration.options.bright')}</option>
                <option value="dreamy">{t('form.preferences.illustration.options.dreamy')}</option>
                <option value="other">{t('form.preferences.illustration.options.other')}</option>
              </select>
              {form.formState.errors.illustrationStyle && (
                <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.illustrationStyle.message)}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.additionalNotes.label')}
          </label>
          <textarea
            id="additionalNotes"
            {...form.register("additionalNotes")}
            placeholder={t('form.additionalNotes.placeholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
          {form.formState.errors.additionalNotes && (
            <p className="mt-2 text-sm text-red-600">{t(form.formState.errors.additionalNotes.message)}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('form.submit.generating')}
            </>
          ) : (
            t('form.submit.generate')
          )}
        </button>
      </div>
    </form>
  );
}