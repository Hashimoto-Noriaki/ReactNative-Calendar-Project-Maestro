import type { Schedule } from '../types/calendar';
import { groupSchedulesByDate } from './group-schedules-by-date';

const createSchedule = (id: number, date: string): Schedule => ({
  id,
  date,
  title: `予定${id}`,
  description: '',
});

describe('groupSchedulesByDate', () => {
  it('同じ日付の予定をまとめる', () => {
    const result = groupSchedulesByDate([
      createSchedule(1, '2026-10-04'),
      createSchedule(2, '2026-10-04'),
      createSchedule(3, '2026-10-05'),
    ]);
    expect(result['2026-10-04'].map((s) => s.id)).toEqual([1, 2]);
    expect(result['2026-10-05'].map((s) => s.id)).toEqual([3]);
  });

  it('予定がない場合は空のオブジェクトを返す', () => {
    expect(groupSchedulesByDate([])).toEqual({});
  });

  it('元の配列の順番を保つ', () => {
    const result = groupSchedulesByDate([
      createSchedule(2, '2026-10-04'),
      createSchedule(1, '2026-10-04'),
    ]);
    expect(result['2026-10-04'].map((s) => s.id)).toEqual([2, 1]);
  });

  describe('年をまたぐ場合', () => {
    it('12月31日と1月1日を別の日として扱う', () => {
      const result = groupSchedulesByDate([
        createSchedule(1, '2026-12-31'),
        createSchedule(2, '2027-01-01'),
      ]);
      expect(Object.keys(result)).toEqual(['2026-12-31', '2027-01-01']);
    });
  });
});
