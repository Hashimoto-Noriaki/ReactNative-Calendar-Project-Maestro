import { formatDateLabel, isDateString, parseDateString, toDateString } from './date-string';

describe('isDateString', () => {
  it('yyyy-MM-dd の実在する日付は true を返す', () => {
    expect(isDateString('2026-10-04')).toBe(true);
  });

  it('月・日が1桁の形式は false を返す', () => {
    expect(isDateString('2026-1-5')).toBe(false);
  });

  it('存在しない日付は false を返す', () => {
    expect(isDateString('2026-02-30')).toBe(false);
    expect(isDateString('2026-13-01')).toBe(false);
  });

  it('空文字は false を返す', () => {
    expect(isDateString('')).toBe(false);
  });

  describe('うるう年の場合', () => {
    it('2028年2月29日は true、2026年2月29日は false を返す', () => {
      expect(isDateString('2028-02-29')).toBe(true);
      expect(isDateString('2026-02-29')).toBe(false);
    });
  });
});

describe('parseDateString', () => {
  const fallback = new Date(2026, 0, 1);

  it('yyyy-MM-dd を端末のタイムゾーンの 0 時の Date にする', () => {
    const date = parseDateString('2026-10-04', fallback);
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(9);
    expect(date.getDate()).toBe(4);
    expect(date.getHours()).toBe(0);
  });

  it('読めない文字列は fallback を返す', () => {
    expect(parseDateString('', fallback)).toBe(fallback);
    expect(parseDateString('abc', fallback)).toBe(fallback);
  });
});

describe('toDateString', () => {
  it('Date を yyyy-MM-dd にする', () => {
    expect(toDateString(new Date(2026, 9, 4, 23, 59))).toBe('2026-10-04');
  });

  describe('年をまたぐ場合', () => {
    it('12月31日の深夜は 12-31 のままにする', () => {
      expect(toDateString(new Date(2026, 11, 31, 23, 59, 59))).toBe('2026-12-31');
    });
  });

  it('parseDateString と往復しても日付が変わらない', () => {
    expect(toDateString(parseDateString('2028-02-29', new Date()))).toBe('2028-02-29');
  });
});

describe('formatDateLabel', () => {
  it('年月日と曜日を日本語で返す', () => {
    expect(formatDateLabel(new Date(2026, 9, 4))).toBe('2026年10月4日(日)');
  });
});
