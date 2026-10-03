import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getDate } from 'date-fns';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { getDateStatus } from '../utils/get-date-status';

type PropsType = {
  currentDate: Date;
  dateList: Date[][];
};

export const CalendarBody = ({ currentDate, dateList }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View>
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
