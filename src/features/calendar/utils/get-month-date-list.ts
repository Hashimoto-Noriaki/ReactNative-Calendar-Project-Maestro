import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
} from 'date-fns';

// 指定した日付が含まれる月のカレンダー（日曜始まりの週の配列）を返す
export const getMonthDateList = (baseDate: Date): Date[][] => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(baseDate),
    end: endOfMonth(baseDate),
  });

  return sundays.map((sunday) => eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) }));
};
