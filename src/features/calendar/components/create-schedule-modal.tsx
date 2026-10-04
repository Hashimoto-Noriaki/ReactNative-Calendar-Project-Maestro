import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Modal, Portal, Text } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parseISO } from 'date-fns';
import { Input, PrimaryBtn } from '@/components/atoms';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { scheduleSchema, type ScheduleFormData } from '../schemas/schedule-schema';
import { useCreateSchedule } from '../hooks/use-create-schedule';

type PropsType = {
  visible: boolean;
  onClose: () => void;
};

export const CreateScheduleModal = ({ visible, onClose }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateSchedule();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: { title: '', date: format(new Date(), 'yyyy-MM-dd'), description: '' },
  });

  const onSubmit = async (data: ScheduleFormData) => {
    setErrorMessage('');
    try {
      await mutateAsync(data);
      reset({ title: '', date: format(new Date(), 'yyyy-MM-dd'), description: '' });
      onClose();
    } catch {
      setErrorMessage('予定の作成に失敗しました');
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          予定作成
        </Text>

        {/* タイトル */}
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              label="タイトル"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.title}
              testID="schedule-title-input"
            />
          )}
        />
        <HelperText type="error" visible={!!errors.title}>
          {errors.title?.message}
        </HelperText>

        {errorMessage !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText} testID="schedule-error-message">
              {errorMessage}
            </Text>
          </View>
        )}

        {/* 日付 */}
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <>
              <Button
                mode="outlined"
                icon="calendar"
                onPress={() => setIsDatePickerOpen(true)}
                testID="schedule-date-button">
                {value}
              </Button>
              <DatePickerModal
                locale="ja"
                mode="single"
                visible={isDatePickerOpen}
                date={parseISO(value)}
                onDismiss={() => setIsDatePickerOpen(false)}
                onConfirm={({ date }) => {
                  if (date) onChange(format(date, 'yyyy-MM-dd'));
                  setIsDatePickerOpen(false);
                }}
              />
            </>
          )}
        />
        <HelperText type="error" visible={!!errors.date}>
          {errors.date?.message}
        </HelperText>

        {/* 内容 */}
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              label="内容"
              multiline
              numberOfLines={4}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.textarea}
              testID="schedule-description-input"
            />
          )}
        />

        <View style={styles.buttonArea}>
          <PrimaryBtn
            size="lg"
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
            testID="schedule-submit-button">
            作成
          </PrimaryBtn>
        </View>
      </Modal>
    </Portal>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: Spacing.three,
      padding: Spacing.four,
      borderRadius: theme.roundness * 3,
      backgroundColor: theme.colors.surface,
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.primary,
      marginBottom: Spacing.three,
    },
    textarea: {
      minHeight: 100,
    },
    buttonArea: {
      alignItems: 'center',
      marginTop: Spacing.two,
    },
    errorBox: {
      padding: Spacing.three,
      marginBottom: Spacing.three,
      borderRadius: theme.roundness * 2,
      backgroundColor: theme.colors.errorContainer,
    },
    errorText: {
      textAlign: 'center',
      color: theme.colors.onErrorContainer,
    },
  });
