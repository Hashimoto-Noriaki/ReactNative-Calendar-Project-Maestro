import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

export const TopPage = () => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets.top), [theme, insets.top]);

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.logo}>
          スケジュール管理APP
        </Text>
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
        <Text variant="headlineLarge" style={[styles.logo, styles.title]}>
          スケジュール管理APP
        </Text>
        <Text variant="titleMedium" style={styles.description}>
          お互いのスケジュールを管理するアプリです
        </Text>
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}>
          ログイン
        </Button>
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
    logo: {
      fontWeight: 'bold',
      color: theme.colors.logoText,
      textShadowColor: theme.colors.logoShadow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 3,
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
    title: {
      textAlign: 'center',
      // headlineLarge の 2 倍
      fontSize: theme.fonts.headlineLarge.fontSize * 2,
      lineHeight: theme.fonts.headlineLarge.lineHeight * 2,
    },
    description: {
      marginTop: 40,
      textAlign: 'center',
      // titleMedium の 2 倍
      fontSize: theme.fonts.titleMedium.fontSize * 2,
      lineHeight: theme.fonts.titleMedium.lineHeight * 2,
    },
    button: {
      marginTop: 80,
    },
    buttonContent: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    buttonLabel: {
      fontSize: 18,
    },
  });
