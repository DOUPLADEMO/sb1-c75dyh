import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateStory } from '@/lib/openai';

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

describe('OpenAI Story Generation', () => {
  const validParams = {
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

  it('generates a story with valid parameters', async () => {
    const story = await generateStory(validParams);
    expect(story).toBe('Test story content');
  });

  it('throws error when API key is missing', async () => {
    delete process.env.OPENAI_API_KEY;
    await expect(generateStory(validParams)).rejects.toThrow('Missing OPENAI_API_KEY');
  });
});