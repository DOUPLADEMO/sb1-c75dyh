import { describe, it, expect } from 'vitest';
import { storyFormSchema } from '@/lib/validations/story-form';

describe('Story Form Validation', () => {
  const validData = {
    characterName: 'Luna',
    theme: 'adventure',
    ageGroup: '6-8',
    length: 5,
    language: 'english',
    mood: 'playful',
  };

  it('validates correct data', () => {
    const result = storyFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects empty character name', () => {
    const result = storyFormSchema.safeParse({ ...validData, characterName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid theme', () => {
    const result = storyFormSchema.safeParse({ ...validData, theme: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid story length', () => {
    const result = storyFormSchema.safeParse({ ...validData, length: 0 });
    expect(result.success).toBe(false);
  });
});