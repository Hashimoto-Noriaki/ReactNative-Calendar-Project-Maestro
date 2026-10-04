import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSchedule } from '../api/update-schedule';

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
