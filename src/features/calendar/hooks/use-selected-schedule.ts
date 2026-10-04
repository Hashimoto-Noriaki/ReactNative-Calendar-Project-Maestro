import { useMemo } from 'react';
import { useCalendarStore } from '../stores/calendar-store';
import { useSchedules } from './use-schedules';

export const useSelectedSchedule = () => {
  const selectedScheduleId = useCalendarStore((state) => state.selectedScheduleId);
  const { data } = useSchedules();

  return useMemo(
    () => data?.find((schedule) => schedule.id === selectedScheduleId) ?? null,
    [data, selectedScheduleId],
  );
};
