import { z } from 'zod';
import type { Schedule } from '../types/calendar';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// 予定作成フォームの入力チェック
export const scheduleSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  date: z.string().regex(DATE_REGEX, '日付を選択してください'),
  description: z.string(),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;

// API のレスポンスが Schedule の形か確かめる
export const scheduleResponseSchema: z.ZodType<Schedule> = z.object({
  id: z.number(),
  date: z.string().regex(DATE_REGEX, '日付は yyyy-MM-dd の形式です'),
  title: z.string(),
  description: z.string(),
});

export const schedulesSchema = z.array(scheduleResponseSchema);
