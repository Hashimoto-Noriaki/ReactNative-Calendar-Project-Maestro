import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSchedule } from '../api/delete-schedule';

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      // Promise を返して、一覧の取り直しが終わるまで送信中の状態にする
      return queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
