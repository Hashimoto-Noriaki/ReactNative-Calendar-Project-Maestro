import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { DAYS_LIST } from '@/constants/calendar';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

export const CalendarHeader = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.row}>
      {DAYS_LIST.map((day) => (
        <Text key={day} style={styles.dayOfWeek}>
          {day}
        </Text>
      ))}
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
    },
    dayOfWeek: {
      flex: 1,
      paddingVertical: Spacing.two,
      textAlign: 'center',
      color: theme.colors.onPrimary,
    },
  });
