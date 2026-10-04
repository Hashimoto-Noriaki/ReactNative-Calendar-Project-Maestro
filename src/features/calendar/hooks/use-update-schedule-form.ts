import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { scheduleSchema, type ScheduleFormData } from '../schemas/schedule-schema';
import type { Schedule } from '../types/calendar';
import { useUpdateSchedule } from './use-update-schedule';

type PropsType = {
  schedule: Schedule;
  // 保存またはキャンセルで編集を終えたときに呼ぶ
  onDone: () => void;
};

export const useUpdateScheduleForm = ({ schedule, onDone }: PropsType) => {
  const { mutateAsync, isPending } = useUpdateSchedule();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    // 編集する予定の内容を初期値にする
    defaultValues: {
      title: schedule.title,
      date: schedule.date,
      description: schedule.description,
    },
  });

  const handleCancel = () => {
    setErrorMessage('');
    onDone();
  };

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage('');
    try {
      await mutateAsync({ id: schedule.id, ...data });
      onDone();
    } catch {
      setErrorMessage('予定の更新に失敗しました');
    }
  });

  return { control, errors, onSubmit, handleCancel, isPending, errorMessage };
};
