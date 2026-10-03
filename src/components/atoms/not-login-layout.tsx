import { ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogoText } from '@/components/atoms/logo-text';
import type { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type PropsType = {
  children: ReactNode;
};

export const NotLoginLayout = ({ children }: PropsType) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets.top), [theme, insets.top]);

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <LogoText size="sm" />
        <View style={styles.nav}>
          <Text style={styles.navItem}>ご利用方法</Text>
          <Text style={styles.navItem}>ログイン</Text>
        </View>
      </View>

      {/* コンテンツ */}
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.content}>
        {children}
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme: AppTheme, topInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      height: 50 + topInset,
      paddingTop: topInset,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.headerBackground,
    },
    nav: {
      flexDirection: 'row',
      gap: 20,
    },
    navItem: {
      color: theme.colors.primary,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
  });
