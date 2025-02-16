import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { StoryPrompt } from '../services/openai';

interface StoryFormProps {
  onSubmit: (prompt: StoryPrompt) => void;
  isLoading: boolean;
}

export function StoryForm({ onSubmit, isLoading }: StoryFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<StoryPrompt>({
    name: '',
    age: 5,
    gender: '',
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
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
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.age')} *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="0"
                max="18"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.gender.label')} *
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('form.gender.options.select')}</option>
                <option value="male">{t('form.gender.options.male')}</option>
                <option value="female">{t('form.gender.options.female')}</option>
                <option value="nonBinary">{t('form.gender.options.nonBinary')}</option>
                <option value="notSpecify">{t('form.gender.options.notSpecify')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="characterType" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.characterType.label')} *
              </label>
              <select
                id="characterType"
                name="characterType"
                required
                value={formData.characterType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('form.characterType.options.select')}</option>
                <option value="human">{t('form.characterType.options.human')}</option>
                <option value="animal">{t('form.characterType.options.animal')}</option>
                <option value="robot">{t('form.characterType.options.robot')}</option>
                <option value="fairy">{t('form.characterType.options.fairy')}</option>
                <option value="other">{t('form.characterType.options.other')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Optional Sections */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('form.personalityTraits.label')}</h3>
          <textarea
            id="personalityTraits"
            name="personalityTraits"
            value={formData.personalityTraits}
            onChange={handleChange}
            placeholder={t('form.personalityTraits.placeholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
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
                name="setting"
                value={formData.setting}
                onChange={handleChange}
                placeholder={t('form.setting.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="specialLocations" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.specialLocations.label')}
              </label>
              <input
                type="text"
                id="specialLocations"
                name="specialLocations"
                value={formData.specialLocations}
                onChange={handleChange}
                placeholder={t('form.specialLocations.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
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
                name="storyType"
                value={formData.storyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('form.storyElements.type.options.select')}</option>
                <option value="adventure">{t('form.storyElements.type.options.adventure')}</option>
                <option value="friendship">{t('form.storyElements.type.options.friendship')}</option>
                <option value="overcomingFear">{t('form.storyElements.type.options.overcomingFear')}</option>
                <option value="mystery">{t('form.storyElements.type.options.mystery')}</option>
                <option value="other">{t('form.storyElements.type.options.other')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.storyElements.tone.label')}
              </label>
              <select
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('form.storyElements.tone.options.select')}</option>
                <option value="funny">{t('form.storyElements.tone.options.funny')}</option>
                <option value="calm">{t('form.storyElements.tone.options.calm')}</option>
                <option value="exciting">{t('form.storyElements.tone.options.exciting')}</option>
                <option value="mysterious">{t('form.storyElements.tone.options.mysterious')}</option>
                <option value="other">{t('form.storyElements.tone.options.other')}</option>
              </select>
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
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                placeholder={t('form.personalDetails.hobbies.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="realReferences" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.personalDetails.realReferences.label')}
              </label>
              <textarea
                id="realReferences"
                name="realReferences"
                value={formData.realReferences}
                onChange={handleChange}
                placeholder={t('form.personalDetails.realReferences.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
              />
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
                name="storyLength"
                value={formData.storyLength}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="short">{t('form.preferences.length.options.short')}</option>
                <option value="medium">{t('form.preferences.length.options.medium')}</option>
                <option value="long">{t('form.preferences.length.options.long')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="illustrationStyle" className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.preferences.illustration.label')}
              </label>
              <select
                id="illustrationStyle"
                name="illustrationStyle"
                value={formData.illustrationStyle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="bright">{t('form.preferences.illustration.options.bright')}</option>
                <option value="dreamy">{t('form.preferences.illustration.options.dreamy')}</option>
                <option value="other">{t('form.preferences.illustration.options.other')}</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.additionalNotes.label')}
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder={t('form.additionalNotes.placeholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
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