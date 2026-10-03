import { z } from 'zod';
import type { Schedule } from '../types/calendar';

// API のレスポンスが Schedule の形か確かめる
export const scheduleSchema: z.ZodType<Schedule> = z.object({
  id: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付は yyyy-MM-dd の形式です'),
  title: z.string(),
  description: z.string(),
});

export const schedulesSchema = z.array(scheduleSchema);
