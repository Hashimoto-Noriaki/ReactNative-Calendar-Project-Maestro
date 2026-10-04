import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { scheduleSchema, type ScheduleFormData } from '../schemas/schedule-schema';
import { useCreateSchedule } from './use-create-schedule';

const getInitialValues = (): ScheduleFormData => ({
  title: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  description: '',
});

type PropsType = {
  onClose: () => void;
};

export const useScheduleForm = ({ onClose }: PropsType) => {
  const { mutateAsync, isPending } = useCreateSchedule();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: getInitialValues(),
  });

  // 閉じるときは入力内容とエラー表示を初期状態に戻す
  const resetForm = () => {
    reset(getInitialValues());
    setErrorMessage('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage('');
    try {
      await mutateAsync(data);
      handleClose();
    } catch {
      setErrorMessage('予定の作成に失敗しました');
    }
  });

  return { control, errors, onSubmit, handleClose, isPending, errorMessage };
};
