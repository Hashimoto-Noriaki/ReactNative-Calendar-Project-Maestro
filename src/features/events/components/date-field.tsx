import { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerChangeEvent,
} from '@react-native-community/datetimepicker';
import { Text } from 'react-native-paper';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { formatDateLabel, parseDateString, toDateString } from '../utils/date-string';

type PropsType = {
  label: string;
  value: string; // "yyyy-MM-dd"
  onChange: (value: string) => void;
  testID?: string;
};

// iOS / Android 用。Web は date-field.web.tsx
export const DateField = ({ label, value, onChange, testID }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const date = parseDateString(value, new Date());

  const handleValueChange = (_event: DateTimePickerChangeEvent, selected: Date) => {
    onChange(toDateString(selected));
  };

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <DateTimePicker
          value={date}
          mode="date"
          display="compact"
          locale="ja-JP"
          onValueChange={handleValueChange}
          testID={testID}
        />
      </View>
    );
  }

  // Android はダイアログを命令的に開く
  const openPicker = () => {
    DateTimePickerAndroid.open({ value: date, mode: 'date', onValueChange: handleValueChange });
  };

  return (
    <Pressable
      style={styles.row}
      onPress={openPicker}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${formatDateLabel(date)}`}
      testID={testID}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{formatDateLabel(date)}</Text>
    </Pressable>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 56,
      paddingHorizontal: Spacing.three,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.surface,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
    },
    value: {
      color: theme.colors.onSurface,
    },
  });
