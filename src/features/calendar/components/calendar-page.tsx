import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { format } from 'date-fns';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useSchedules } from '../hooks/use-schedules';
import { useCalendarStore } from '../stores/calendar-store';
import { getMonthDateList } from '../utils/get-month-date-list';
import { CalendarBody } from './calendar-body';
import { CalendarHeader } from './calendar-header';
import { CalendarNav } from './calendar-nav';

export const CalendarPage = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const currentDate = useCalendarStore((state) => state.currentDate);
  const dateList = useMemo(() => getMonthDateList(currentDate), [currentDate]);
  const { data: schedules, isLoading, isError } = useSchedules();

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
      <Text style={styles.count}>予定: {schedules?.length ?? 0}件</Text>

      <View style={styles.table}>
        <CalendarHeader />
        <CalendarBody currentDate={currentDate} dateList={dateList} />
      </View>
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: Spacing.three,
      paddingTop: Spacing.four,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 'bold',
      marginBottom: Spacing.two,
    },
    count: {
      marginBottom: Spacing.twoHalf,
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
