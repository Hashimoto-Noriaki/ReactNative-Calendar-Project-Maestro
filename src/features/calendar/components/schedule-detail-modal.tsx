import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Modal, Portal, Text } from 'react-native-paper';
import { format, parseISO } from 'date-fns';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useSelectedSchedule } from '../hooks/use-selected-schedule';
import { useCalendarStore } from '../stores/calendar-store';

export const ScheduleDetailModal = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const schedule = useSelectedSchedule();
  const clearSelectedSchedule = useCalendarStore((state) => state.clearSelectedSchedule);

  return (
    <Portal>
      <Modal
        visible={!!schedule}
        onDismiss={clearSelectedSchedule}
        contentContainerStyle={styles.container}>
        {schedule && (
          <View style={styles.content}>
            <Text variant="headlineSmall" style={styles.title} testID="schedule-detail-title">
              {schedule.title}
            </Text>
            <View style={styles.dateRow}>
              <Icon source="calendar" size={18} color={theme.colors.primary} />
              <Text>{format(parseISO(schedule.date), 'yyyy年M月d日')}</Text>
            </View>
            <Text style={styles.description}>{schedule.description || '（内容なし）'}</Text>
            <View style={styles.actions}>
              <Button
                mode="text"
                onPress={clearSelectedSchedule}
                testID="schedule-detail-close-button">
                閉じる
              </Button>
            </View>
          </View>
        )}
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
