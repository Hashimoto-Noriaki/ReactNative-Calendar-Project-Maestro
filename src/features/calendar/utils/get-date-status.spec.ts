import { getDateStatus } from './get-date-status';

describe('getDateStatus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 4, 10, 0, 0)); // 今日を2026年10月4日に固定
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('今日の日付は today を返す', () => {
    expect(getDateStatus(new Date(2026, 9, 4), new Date(2026, 9, 1))).toBe('today');
  });

  it('表示中の月の日付は currentMonth を返す', () => {
    expect(getDateStatus(new Date(2026, 9, 31), new Date(2026, 9, 1))).toBe('currentMonth');
  });

  it('前月末の日付は otherMonth を返す', () => {
    expect(getDateStatus(new Date(2026, 8, 30), new Date(2026, 9, 1))).toBe('otherMonth');
  });
});
