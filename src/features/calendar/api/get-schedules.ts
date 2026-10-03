import { API_URL } from '@/constants/api';
import type { Schedule } from '../types/calendar';

export const getSchedules = async (): Promise<Schedule[]> => {
  const res = await fetch(`${API_URL}/api/schedules`);
  if (!res.ok) {
    throw new Error('予定の取得に失敗しました');
  }
  return res.json();
};
