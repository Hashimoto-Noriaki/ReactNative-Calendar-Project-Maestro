import { useMemo, type ChangeEvent, type CSSProperties } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type PropsType = {
  label: string;
  value: string; // "yyyy-MM-dd"
  onChange: (value: string) => void;
  testID?: string;
};

// Web 用。@react-native-community/datetimepicker は Web では何も表示しないため、ブラウザの日付入力を使う
export const DateField = ({ label, value, onChange, testID }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const inputStyle = useMemo(() => createInputStyle(theme), [theme]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <input
        type="date"
        value={value}
        onChange={handleChange}
        aria-label={label}
        data-testid={testID}
        style={inputStyle}
      />
    </View>
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
  });

// <input> は DOM の要素なので、StyleSheet ではなく CSS のスタイルを渡す
const createInputStyle = (theme: AppTheme): CSSProperties => ({
  padding: Spacing.one,
  fontSize: 16,
  border: 'none',
  color: theme.colors.onSurface,
  backgroundColor: 'transparent',
  colorScheme: theme.dark ? 'dark' : 'light',
});
