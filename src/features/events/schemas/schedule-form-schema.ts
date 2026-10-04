import { z } from 'zod';
import { isDateString } from '../utils/date-string';

export const TITLE_MAX_LENGTH = 50;
export const DESCRIPTION_MAX_LENGTH = 200;

export const scheduleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'タイトルを入力してください')
    .max(TITLE_MAX_LENGTH, `タイトルは${TITLE_MAX_LENGTH}文字以内で入力してください`),
  date: z.string().refine(isDateString, '日付を選択してください'),
  description: z
    .string()
    .trim()
    .max(DESCRIPTION_MAX_LENGTH, `説明は${DESCRIPTION_MAX_LENGTH}文字以内で入力してください`),
});

export type ScheduleFormSchemaType = z.infer<typeof scheduleFormSchema>;
