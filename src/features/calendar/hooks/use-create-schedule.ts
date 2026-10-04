import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchedule } from '../api/create-schedule';

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      // Promise を返して、一覧の取り直しが終わるまで送信中の状態にする
      return queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
