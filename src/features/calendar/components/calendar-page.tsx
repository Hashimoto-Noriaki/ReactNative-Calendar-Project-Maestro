import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { format } from 'date-fns';
import type { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useCalendar } from '../hooks/use-calendar';
import { CalendarBody } from './calendar-body';
import { CalendarHeader } from './calendar-header';
import { CalendarNav } from './calendar-nav';

export const CalendarPage = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { currentDate, dateList, schedulesByDate, isLoading, isError } = useCalendar();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>予定の取得に失敗しました</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title} testID="calendar-month-title">
        {format(currentDate, 'yyyy年M月')}
      </Text>
      <CalendarNav />
      <View style={styles.table}>
        <CalendarHeader />
        <CalendarBody
          currentDate={currentDate}
          dateList={dateList}
          schedulesByDate={schedulesByDate}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: Spacing.three,
      paddingTop: Spacing.four,
      paddingBottom: Spacing.four,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: Spacing.two,
    },
    status: {
      marginBottom: Spacing.twoHalf,
    },
    errorText: {
      color: theme.colors.error,
    },
    table: {
      width: '100%',
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
  });
