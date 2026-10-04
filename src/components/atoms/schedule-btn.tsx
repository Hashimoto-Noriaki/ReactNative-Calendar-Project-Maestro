import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type PropsType = {
  children: string;
  onPress: () => void;
  testID?: string;
};

export const ScheduleBtn = ({ children, onPress, testID }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable style={styles.button} onPress={onPress} testID={testID}>
      <Text style={styles.label} numberOfLines={1}>
        {children}
      </Text>
    </Pressable>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      width: '94%',
      paddingHorizontal: Spacing.one,
      paddingVertical: Spacing.half,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
    label: {
      fontSize: 10,
      color: theme.colors.onPrimary,
    },
  });
