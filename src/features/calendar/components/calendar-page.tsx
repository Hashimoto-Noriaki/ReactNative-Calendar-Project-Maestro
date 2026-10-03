import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { format, getDate } from 'date-fns';
import { DAYS_LIST } from '@/constants/calendar';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useSchedules } from '../hooks/use-schedules';
import { getDateStatus } from '../utils/get-date-status';
import { getMonthDateList } from '../utils/get-month-date-list';

export const CalendarPage = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [currentDate] = useState(() => new Date());
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
      <Text style={styles.count}>予定: {schedules?.length ?? 0}件</Text>

      <View style={styles.table}>
        {/* 曜日 */}
        <View style={[styles.row, styles.headerRow]}>
          {DAYS_LIST.map((day) => (
            <Text key={day} style={styles.dayOfWeek}>
              {day}
            </Text>
          ))}
        </View>

        {/* 日付 */}
        {dateList.map((week) => (
          <View key={week[0].toISOString()} style={styles.row}>
            {week.map((date) => {
              const status = getDateStatus(date, currentDate);
              return (
                <View key={date.toISOString()} style={styles.cell}>
                  <View style={[styles.dateCircle, status === 'today' && styles.todayCircle]}>
                    <Text
                      style={[
                        styles.dateText,
                        status === 'today' && styles.todayText,
                        status === 'otherMonth' && styles.otherMonthText,
                      ]}>
                      {getDate(date)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
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
    row: {
      flexDirection: 'row',
    },
    headerRow: {
      backgroundColor: theme.colors.primary,
    },
    dayOfWeek: {
      flex: 1,
      paddingVertical: Spacing.two,
      textAlign: 'center',
      color: theme.colors.onPrimary,
    },
    cell: {
      flex: 1,
      height: 80,
      alignItems: 'center',
      padding: Spacing.one,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.outlineVariant,
    },
    dateCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    todayCircle: {
      backgroundColor: theme.colors.primary,
    },
    dateText: {
      fontSize: 12,
      color: theme.colors.onSurface,
    },
    todayText: {
      color: theme.colors.onPrimary,
    },
    otherMonthText: {
      color: theme.colors.outline,
    },
  });
