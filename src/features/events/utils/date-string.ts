import { format, isMatch, isValid, parse } from 'date-fns';
import { ja } from 'date-fns/locale';

const DATE_FORMAT = 'yyyy-MM-dd';

// "yyyy-MM-dd" の形式で、実在する日付か（2月30日や "2026-1-5" は false）
export const isDateString = (value: string): boolean =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && isMatch(value, DATE_FORMAT);

// "yyyy-MM-dd" を端末のタイムゾーンの 0 時の Date にする。読めないときは fallback を返す
export const parseDateString = (value: string, fallback: Date): Date => {
  const date = parse(value, DATE_FORMAT, fallback);
  return isValid(date) ? date : fallback;
};

// Date を保存用の "yyyy-MM-dd" にする（端末のタイムゾーンの日付）
export const toDateString = (date: Date): string => format(date, DATE_FORMAT);

// 画面に出す日付（例: 2026年10月4日(日)）
export const formatDateLabel = (date: Date): string =>
  format(date, 'yyyy年M月d日(E)', { locale: ja });
