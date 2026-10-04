import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { format } from 'date-fns';
import { Spacing, type AppTheme } from '@/constants/theme';
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
        <Text style={styles.errorText} testID="calendar-schedules-error">
          予定の取得に失敗しました
        </Text>
      </View>
    );
  }

  return (
    // 6週ある月は小さい画面に収まらないため、スクロールできるようにする
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
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
