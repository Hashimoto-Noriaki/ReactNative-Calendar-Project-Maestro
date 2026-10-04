import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SCHEDULES_QUERY_KEY } from '@/features/calendar';
import { createSchedule } from '../api/create-schedule';

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    // 作った予定がカレンダーに出るよう、一覧を取り直す
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SCHEDULES_QUERY_KEY }),
  });
};
