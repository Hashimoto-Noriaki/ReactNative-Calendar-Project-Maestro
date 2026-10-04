import { API_URL } from '@/constants/api';
import { scheduleSchema, type NewSchedule, type Schedule } from '@/features/calendar';

export const createSchedule = async (newSchedule: NewSchedule): Promise<Schedule> => {
  const res = await fetch(`${API_URL}/api/schedules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSchedule),
  });
  if (!res.ok) {
    throw new Error('予定の作成に失敗しました');
  }
  const result = scheduleSchema.safeParse(await res.json());
  if (!result.success) {
    throw new Error('予定のデータの形式が正しくありません');
  }
  return result.data;
};
