import { useLocalSearchParams } from 'expo-router';
import { ScheduleCreatePage } from '@/features/events';

export default function NewSchedule() {
  // カレンダーから開いたときの初期日付（"yyyy-MM-dd"）
  const { date } = useLocalSearchParams<{ date?: string }>();
  return <ScheduleCreatePage initialDate={date} />;
}
