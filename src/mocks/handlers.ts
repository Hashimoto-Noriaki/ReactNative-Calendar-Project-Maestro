import { http, HttpResponse } from 'msw';
import { API_URL } from '@/constants/api';
import type { Schedule } from '@/features/calendar/types/calendar';

// メモリ上で予定を管理（後の章で追加・削除を実装する）
const scheduleStore: Schedule[] = [];

export const handlers = [
  http.get(`${API_URL}/api/schedules`, () => {
    return HttpResponse.json(scheduleStore);
  }),
];
