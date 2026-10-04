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
// 作成する予定の id（同じミリ秒に作っても重複しないよう連番にする）
let nextId = scheduleStore.length + 1;

export const handlers = [
  http.get(`${API_URL}/api/schedules`, () => {
    return HttpResponse.json(scheduleStore);
  }),

  http.post(`${API_URL}/api/schedules`, async ({ request }) => {
    const newSchedule = (await request.json()) as NewSchedule;
    const schedule: Schedule = { id: nextId++, ...newSchedule };
    scheduleStore = [...scheduleStore, schedule];
    return HttpResponse.json(schedule, { status: 201 });
  }),

  http.patch(`${API_URL}/api/schedules/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Partial<NewSchedule>;
    const target = scheduleStore.find((schedule) => schedule.id === id);
    if (!target) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }
    const updated: Schedule = { ...target, ...body };
    scheduleStore = scheduleStore.map((schedule) => (schedule.id === id ? updated : schedule));
    return HttpResponse.json(updated);
  }),
];
