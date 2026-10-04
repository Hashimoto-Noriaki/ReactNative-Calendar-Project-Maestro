import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { ErrorMessage, PrimaryBtn } from '@/components/atoms';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useUpdateScheduleForm } from '../hooks/use-update-schedule-form';
import { useCalendarStore } from '../stores/calendar-store';
import type { Schedule } from '../types/calendar';
import { ScheduleFormFields } from './schedule-form-fields';

type PropsType = {
  schedule: Schedule;
};

// 編集中だけ表示する。保存・キャンセルすると詳細のモーダルに戻る
export const UpdateScheduleModal = ({ schedule }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const stopEditing = useCalendarStore((state) => state.stopEditing);
  const { control, errors, onSubmit, handleCancel, isPending, errorMessage } =
    useUpdateScheduleForm({ schedule, onDone: stopEditing });

  return (
    <Portal>
      <Modal
        visible
        onDismiss={handleCancel}
        // 送信中は背景をタップしても閉じない
        dismissable={!isPending}
        contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          予定編集
        </Text>

        <ErrorMessage testID="schedule-update-error-message">{errorMessage}</ErrorMessage>
        <ScheduleFormFields control={control} errors={errors} />

        <View style={styles.actions}>
          <Button
            mode="text"
            onPress={handleCancel}
            disabled={isPending}
            testID="schedule-update-cancel-button">
            キャンセル
          </Button>
          <PrimaryBtn
            size="sm"
            onPress={onSubmit}
            loading={isPending}
            testID="schedule-update-submit-button">
            保存
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
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: Spacing.two,
      marginTop: Spacing.four,
    },
  });
