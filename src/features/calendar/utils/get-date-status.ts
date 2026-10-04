import { isSameMonth, isToday } from 'date-fns';

export type DateStatus = 'today' | 'currentMonth' | 'otherMonth';

export const getDateStatus = (targetDate: Date, displayedDate: Date): DateStatus => {
  if (isToday(targetDate)) return 'today';
  return isSameMonth(targetDate, displayedDate) ? 'currentMonth' : 'otherMonth';
};
