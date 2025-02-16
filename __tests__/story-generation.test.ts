import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateStory } from '@/lib/openai';
import { storyFormSchema } from '@/lib/validations/story-form';

vi.mock('openai', () => {
  return {
    default: class MockOpenAI {
      chat = {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: 'Test story content',
                },
              },
            ],
          }),
        },
      };
    },
  };
});

describe('Story Generation', () => {
  const validStoryParams = {
    characterName: 'Luna',
    theme: 'adventure',
    ageGroup: '6-8',
    length: 5,
    language: 'english',
    mood: 'playful',
  };

  beforeEach(() => {
    process.env.OPENAI_API_KEY = 'test-api-key';
  });

  it('validates story parameters correctly', () => {
    const result = storyFormSchema.safeParse(validStoryParams);
    expect(result.success).toBe(true);
  });

  it('rejects invalid story parameters', () => {
    const invalidParams = {
      ...validStoryParams,
      characterName: '', // Too short
    };
    const result = storyFormSchema.safeParse(invalidParams);
    expect(result.success).toBe(false);
  });

  it('generates a story successfully', async () => {
    const story = await generateStory(validStoryParams);
    expect(story).toBe('Test story content');
  });

  it('includes all parameters in the prompt', async () => {
    await generateStory(validStoryParams);
    const openai = (await import('@/lib/openai')).openai;
    expect(openai.chat.completions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({
            content: expect.stringContaining(validStoryParams.characterName),
          }),
        ]),
      })
    );
  });
});