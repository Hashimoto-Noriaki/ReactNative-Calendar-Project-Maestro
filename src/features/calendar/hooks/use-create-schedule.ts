import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchedule } from '../api/create-schedule';

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
