"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { THEMES, AGE_GROUPS, LANGUAGES, MOODS, STORY_LENGTH } from "@/lib/constants/story-options";
import { advancedStoryFormSchema, AdvancedStoryFormValues } from "@/lib/validations/advanced-story-form";
import { useTranslations } from "next-intl";

interface BasicStoryFormProps {
  onSubmit: (values: AdvancedStoryFormValues) => Promise<void>;
  isLoading: boolean;
}

export function BasicStoryForm({ onSubmit, isLoading }: BasicStoryFormProps) {
  const form = useForm<AdvancedStoryFormValues>({
    resolver: zodResolver(advancedStoryFormSchema),
    defaultValues: {
      characterName: "",
      age: "3-5",
      length: '5',
      language: "english",
      tone: "playful",
    },
  });
  const t = useTranslations();

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="characterName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Character&apos;s Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="illustrationStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {THEMES.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AGE_GROUPS.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">{t('form.gender.options.male')}</SelectItem>
                  <SelectItem value="female">{t('form.gender.options.female')}</SelectItem>
                  <SelectItem value="nonBinary">{t('form.gender.options.nonBinary')}</SelectItem>
                  <SelectItem value="notSpecify">{t('form.gender.options.notSpecify')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story Length ({STORY_LENGTH.min}-{STORY_LENGTH.max} minutes)</FormLabel>
              <FormControl>
                <Slider
                  min={STORY_LENGTH.min}
                  max={STORY_LENGTH.max}
                  step={STORY_LENGTH.step}
                  value={[parseInt(field.value!)]}
                  onValueChange={(value) => field.onChange(value[0].toString())}
                  onBlur={field.onBlur}
                  className="w-full"
                />
              </FormControl>
              <div className="text-sm text-gray-500 mt-2">Selected length: {field.value} minutes</div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story Mood</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MOODS.map((mood) => (
                    <SelectItem key={mood.value} value={mood.value}>
                      {mood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Story...
            </>
          ) : (
            'Generate Story'
          )}
        </Button>
      </form>
    </Form>
  );
}