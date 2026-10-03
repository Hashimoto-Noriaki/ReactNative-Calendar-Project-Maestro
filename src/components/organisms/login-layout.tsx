import { Link } from 'expo-router';
import { ReactNode, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets, type EdgeInsets } from 'react-native-safe-area-context';
import { LogoText } from '@/components/atoms/logo-text';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type PropsType = {
  children: ReactNode;
  userName: string;
  onLogout: () => void;
};

export const LoginLayout = ({ children, userName, onLogout }: PropsType) => {
  const theme = useAppTheme();
  const { top, bottom, left, right } = useSafeAreaInsets();
  const styles = useMemo(
    () => createStyles(theme, { top, bottom, left, right }),
    [theme, top, bottom, left, right],
  );

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Link href="/calendar" asChild>
          <Pressable>
            <LogoText size="sm" />
          </Pressable>
        </Link>
        <View style={styles.nav}>
          {userName !== '' && <Text style={styles.userName}>{userName} さん</Text>}
          <Pressable onPress={onLogout} testID="logout-button">
            <Text style={styles.navItem}>ログアウト</Text>
          </Pressable>
        </View>
      </View>

      {/* コンテンツ */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const createStyles = (theme: AppTheme, { top, bottom, left, right }: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      minHeight: 50 + top,
      paddingTop: top,
      paddingLeft: Spacing.three + left,
      paddingRight: Spacing.three + right,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.headerBackground,
    },
    nav: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexShrink: 1,
      alignItems: 'center',
      gap: Spacing.threeHalf,
    },
    userName: {
      color: theme.colors.onSurface,
      flexShrink: 1,
    },
    navItem: {
      color: theme.colors.primary,
    },
    content: {
      flex: 1,
      paddingLeft: left,
      paddingRight: right,
      paddingBottom: bottom,
    },
  });
