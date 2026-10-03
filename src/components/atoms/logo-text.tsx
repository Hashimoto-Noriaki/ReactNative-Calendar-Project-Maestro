import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import type { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type PropsType = {
  size: 'sm' | 'lg';
};

export const LogoText = ({ size }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Text
      variant={size === 'lg' ? 'headlineLarge' : 'titleLarge'}
      style={[styles.logo, size === 'lg' && styles.lg]}>
      スケジュール管理APP
    </Text>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    logo: {
      flexShrink: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.logoText,
      textShadowColor: theme.colors.logoShadow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 3,
    },
    // headlineLarge の 2 倍
    lg: {
      fontSize: theme.fonts.headlineLarge.fontSize * 2,
      lineHeight: theme.fonts.headlineLarge.lineHeight * 2,
    },
  });
