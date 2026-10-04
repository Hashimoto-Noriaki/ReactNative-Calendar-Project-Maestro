import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { format, getDate } from 'date-fns';
import { ScheduleBtn } from '@/components/atoms';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import type { Schedule } from '../types/calendar';
import { getDateStatus } from '../utils/get-date-status';

type PropsType = {
  currentDate: Date;
  dateList: Date[][];
  schedulesByDate: Record<string, Schedule[]>;
};

export const CalendarBody = ({ currentDate, dateList, schedulesByDate }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View>
      {dateList.map((week) => (
        <View key={week[0].toISOString()} style={styles.row}>
          {week.map((date) => {
            const status = getDateStatus(date, currentDate);
            const schedules = schedulesByDate[format(date, 'yyyy-MM-dd')] ?? [];
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
                <View style={styles.scheduleList}>
                  {schedules.map((schedule) => (
                    <ScheduleBtn
                      key={schedule.id}
                      onPress={() => {}}
                      testID={`schedule-${schedule.id}`}>
                      {schedule.title}
                    </ScheduleBtn>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    cell: {
      flex: 1,
      height: 80,
      alignItems: 'center',
      padding: Spacing.one,
      // 予定が多い日はセルの高さを超えた分を隠す
      overflow: 'hidden',
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
    scheduleList: {
      width: '100%',
      alignItems: 'center',
      gap: Spacing.half,
      marginTop: Spacing.half,
    },
  });
