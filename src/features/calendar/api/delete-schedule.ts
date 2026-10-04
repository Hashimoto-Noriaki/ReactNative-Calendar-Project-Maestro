import { API_URL } from '@/constants/api';

export const deleteSchedule = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/api/schedules/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('予定の削除に失敗しました');
  }
};
