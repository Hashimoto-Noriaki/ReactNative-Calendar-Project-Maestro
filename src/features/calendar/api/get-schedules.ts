import { API_URL } from '@/constants/api';
import { schedulesSchema } from '../schemas/schedule-schema';
import type { Schedule } from '../types/calendar';

export const getSchedules = async (): Promise<Schedule[]> => {
  const res = await fetch(`${API_URL}/api/schedules`);
  if (!res.ok) {
    throw new Error('予定の取得に失敗しました');
  }
  const result = schedulesSchema.safeParse(await res.json());
  if (!result.success) {
    throw new Error('予定のデータの形式が正しくありません');
  }
  return result.data;
};
