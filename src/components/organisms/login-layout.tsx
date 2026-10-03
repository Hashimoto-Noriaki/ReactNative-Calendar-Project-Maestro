import { ReactNode, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogoText } from '@/components/atoms/logo-text';
import type { AppTheme } from '@/constants/theme';
import { useLoginUserStore } from '@/features/auth/stores/login-user-store';
import { useAppTheme } from '@/hooks/use-app-theme';

type PropsType = {
  children: ReactNode;
};

export const LoginLayout = ({ children }: PropsType) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets.top), [theme, insets.top]);
  const loginUser = useLoginUserStore((state) => state.loginUser);
  const logout = useLoginUserStore((state) => state.logout);

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Link href="/" asChild>
          <Pressable>
            <LogoText size="sm" />
          </Pressable>
        </Link>
        <View style={styles.nav}>
          <View style={styles.navItem}>
            <Icon source="account" size={18} color={theme.colors.primary} />
            <Text style={styles.navText} testID="header-user-name">
              {loginUser.name}
            </Text>
          </View>
          <Pressable style={styles.navItem} onPress={logout} testID="header-logout-button">
            <Icon source="logout" size={18} color={theme.colors.primary} />
            <Text style={styles.navText}>ログアウト</Text>
          </Pressable>
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
      gap: 16,
    },
    navItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    navText: {
      color: theme.colors.primary,
    },
    content: {
      flex: 1,
    },
  });
