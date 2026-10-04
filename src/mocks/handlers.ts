import { http, HttpResponse } from 'msw';
import { addDays, format } from 'date-fns';
import { API_URL } from '@/constants/api';
import type { NewSchedule, Schedule } from '@/features/calendar/types/calendar';

const today = new Date();
const toYmd = (date: Date) => format(date, 'yyyy-MM-dd');

// メモリ上で予定を管理（アプリを再起動すると初期状態に戻る）
let scheduleStore: Schedule[] = [
  { id: 1, title: '予定1', description: '説明1', date: toYmd(today) },
  { id: 2, title: '予定2', description: '説明2', date: toYmd(today) },
  { id: 3, title: '予定3', description: '説明3', date: toYmd(addDays(today, 1)) },
  { id: 4, title: '予定4', description: '説明4', date: toYmd(addDays(today, 7)) },
  { id: 5, title: '予定5', description: '説明5', date: toYmd(addDays(today, -9)) },
];

export const handlers = [
  http.get(`${API_URL}/api/schedules`, () => {
    return HttpResponse.json(scheduleStore);
  }),

  http.post(`${API_URL}/api/schedules`, async ({ request }) => {
    const newSchedule = (await request.json()) as NewSchedule;
    const nextId = Math.max(0, ...scheduleStore.map((schedule) => schedule.id)) + 1;
    const created: Schedule = { ...newSchedule, id: nextId };
    scheduleStore = [...scheduleStore, created];
    return HttpResponse.json(created, { status: 201 });
  }),
];
