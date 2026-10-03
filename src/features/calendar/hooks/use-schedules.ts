import { useQuery } from '@tanstack/react-query';
import { getSchedules } from '../api/get-schedules';

export const useSchedules = () => {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: getSchedules,
  });
};
