import { API_URL } from '@/constants/api';
import type { Schedule } from '../types/calendar';

export const updateSchedule = async (schedule: Schedule): Promise<Schedule> => {
  const { id, ...body } = schedule;
  const res = await fetch(`${API_URL}/api/schedules/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error('予定の更新に失敗しました');
  }
  return res.json();
};
