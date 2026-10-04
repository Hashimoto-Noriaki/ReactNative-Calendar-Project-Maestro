import { format } from 'date-fns';
import { getMonthDateList } from './get-month-date-list';

const toYmd = (date: Date) => format(date, 'yyyy-MM-dd');

describe('getMonthDateList', () => {
  it('どの週も日曜日から始まふ7日分になる', () => {
    const result = getMonthDateList(new Date(2026, 9, 1));
    result.forEach((week) => {
      expect(week).toHaveLength(7);
      expect(week[0].getDay()).toBe(0);
    });
  });

  it('2026年2月は1日が日曜、28日が土曜なので4週分を返す', () => {
    const result = getMonthDateList(new Date(2026, 1, 15));
    expect(result).toHaveLength(4);
    expect(toYmd(result[0][0])).toBe('2026-02-01');
    expect(toYmd(result[3][6])).toBe('2026-02-28');
  });

  it('2026年5月は前月末と翌月初を含めて6週分を返す', () => {
    const result = getMonthDateList(new Date(2026, 4, 1));
    expect(result).toHaveLength(6);
    expect(toYmd(result[0][0])).toBe('2026-04-26');
    expect(toYmd(result[5][6])).toBe('2026-06-06');
  });

  describe('うるう年の場合', () => {
    it('2028年2月は29日を含む', () => {
      const result = getMonthDateList(new Date(2028, 1, 1));
      const days = result.flat().map(toYmd);
      expect(days).toContain('2028-02-29');
      expect(days[days.length - 1]).toBe('2028-03-04');
    });
  });

  describe('年をまたぐ場合', () => {
    it('2026年12月の最終週は2027年1月2日まで含む', () => {
      const result = getMonthDateList(new Date(2026, 11, 1));
      expect(toYmd(result[0][0])).toBe('2026-11-29');
      expect(toYmd(result[result.length - 1][6])).toBe('2027-01-02');
    });
  });
});
