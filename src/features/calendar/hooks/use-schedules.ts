import { useQuery } from '@tanstack/react-query';
import { getSchedules } from '../api/get-schedules';

// 予定を追加・変更したときに、このキーで一覧を取り直す
export const SCHEDULES_QUERY_KEY = ['schedules'];

export const useSchedules = () => {
  return useQuery({
    queryKey: SCHEDULES_QUERY_KEY,
    queryFn: getSchedules,
  });
};
