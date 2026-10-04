import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Icon, Modal, Portal, Text } from 'react-native-paper';
import { format, parseISO } from 'date-fns';
import { ErrorMessage } from '@/components/atoms';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useDeleteSchedule } from '../hooks/use-delete-schedule';
import { useSelectedSchedule } from '../hooks/use-selected-schedule';
import { useCalendarStore } from '../stores/calendar-store';
import { UpdateScheduleModal } from './update-schedule-modal';

export const ScheduleDetailModal = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const schedule = useSelectedSchedule();
  const isEditing = useCalendarStore((state) => state.isEditing);
  const clearSelectedSchedule = useCalendarStore((state) => state.clearSelectedSchedule);
  const startEditing = useCalendarStore((state) => state.startEditing);
  const { mutateAsync: deleteSchedule, isPending: isDeleting } = useDeleteSchedule();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setErrorMessage('');
    clearSelectedSchedule();
  };

  const handleDelete = async () => {
    if (!schedule) return;
    setIsConfirmOpen(false);
    setErrorMessage('');
    try {
      await deleteSchedule(schedule.id);
      clearSelectedSchedule();
    } catch {
      setErrorMessage('予定の削除に失敗しました');
    }
  };

  if (schedule && isEditing) {
    return <UpdateScheduleModal schedule={schedule} />;
  }

  return (
    <Portal>
      <Modal visible={!!schedule} onDismiss={handleClose} contentContainerStyle={styles.container}>
        {schedule && (
          <View style={styles.content}>
            <Text variant="headlineSmall" style={styles.title} testID="schedule-detail-title">
              {schedule.title}
            </Text>
            <ErrorMessage testID="schedule-detail-error-message">{errorMessage}</ErrorMessage>
            <View style={styles.dateRow}>
              <Icon source="calendar" size={18} color={theme.colors.primary} />
              <Text>{format(parseISO(schedule.date), 'yyyy年M月d日')}</Text>
            </View>
            <Text style={styles.description}>{schedule.description || '（内容なし）'}</Text>
            <View style={styles.actions}>
              <Button
                mode="text"
                textColor={theme.colors.error}
                onPress={() => setIsConfirmOpen(true)}
                loading={isDeleting}
                disabled={isDeleting}
                testID="schedule-detail-delete-button">
                削除
              </Button>
              <Button mode="text" onPress={handleClose} testID="schedule-detail-close-button">
                閉じる
              </Button>
              <Button mode="contained" onPress={startEditing} testID="schedule-detail-edit-button">
                編集
              </Button>
            </View>
          </View>
        )}
      </Modal>

      {/* 削除の確認ダイアログ */}
      <Dialog visible={isConfirmOpen} onDismiss={() => setIsConfirmOpen(false)}>
        <Dialog.Title>予定を削除しますか？</Dialog.Title>
        <Dialog.Content>
          <Text>削除した予定は元に戻せません。</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setIsConfirmOpen(false)} testID="schedule-delete-cancel-button">
            キャンセル
          </Button>
          <Button
            textColor={theme.colors.error}
            onPress={handleDelete}
            testID="schedule-delete-confirm-button">
            削除する
          </Button>
        </Dialog.Actions>
      </Dialog>
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
    content: {
      gap: Spacing.three,
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.primary,
    },
    dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.two,
    },
    description: {
      color: theme.colors.onSurfaceVariant,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: Spacing.two,
    },
  });
