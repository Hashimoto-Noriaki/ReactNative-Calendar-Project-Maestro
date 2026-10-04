import { useMemo } from 'react';
import { useCalendarStore } from '../stores/calendar-store';
import type { Schedule } from '../types/calendar';
import { getMonthDateList } from '../utils/get-month-date-list';
import { groupSchedulesByDate } from '../utils/group-schedules-by-date';
import { useSchedules } from './use-schedules';

const EMPTY_SCHEDULES: Schedule[] = [];

export const useCalendar = () => {
  const currentDate = useCalendarStore((state) => state.currentDate);
  const { data, isLoading, isError } = useSchedules();
  const schedules = data ?? EMPTY_SCHEDULES;

  const dateList = useMemo(() => getMonthDateList(currentDate), [currentDate]);
  const schedulesByDate = useMemo(() => groupSchedulesByDate(schedules), [schedules]);

  return { currentDate, dateList, schedulesByDate, isLoading, isError };
};
