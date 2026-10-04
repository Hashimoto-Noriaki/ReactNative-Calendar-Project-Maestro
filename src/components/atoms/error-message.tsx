import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type PropsType = {
  children: string;
  testID?: string;
};

export const ErrorMessage = ({ children, testID }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (children === '') return null;

  return (
    <View style={styles.box}>
      <Text style={styles.text} testID={testID}>
        {children}
      </Text>
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    box: {
      width: '100%',
      padding: Spacing.three,
      marginBottom: Spacing.three,
      borderRadius: theme.roundness * 2,
      backgroundColor: theme.colors.errorContainer,
    },
    text: {
      textAlign: 'center',
      color: theme.colors.onErrorContainer,
    },
  });
