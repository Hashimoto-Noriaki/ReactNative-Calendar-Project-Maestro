import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSchedule } from '../api/update-schedule';

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      // Promise を返して、一覧の取り直しが終わるまで送信中の状態にする
      return queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
