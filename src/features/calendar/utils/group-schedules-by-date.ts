import type { Schedule } from '../types/calendar';

// 予定を "yyyy-MM-dd" ごとにまとめる
export const groupSchedulesByDate = (schedules: Schedule[]): Record<string, Schedule[]> => {
  return schedules.reduce<Record<string, Schedule[]>>((result, schedule) => {
    const list = result[schedule.date] ?? [];
    result[schedule.date] = [...list, schedule];
    return result;
  }, {});
};
