import { ReactNode, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets, type EdgeInsets } from 'react-native-safe-area-context';
import { LogoText } from '@/components/atoms/logo-text';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type PropsType = {
  children: ReactNode;
};

export const NotLoginLayout = ({ children }: PropsType) => {
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
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </LinearGradient>
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
      gap: Spacing.threeHalf,
    },
    navItem: {
      color: theme.colors.primary,
      flexShrink: 1,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: bottom,
    },
  });
