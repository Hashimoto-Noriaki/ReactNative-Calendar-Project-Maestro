import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useCalendar } from '../hooks/use-calendar';
import { CalendarBody } from './calendar-body';
import { CalendarHeader } from './calendar-header';
import { CalendarNav } from './calendar-nav';

export const CalendarPage = () => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets.bottom), [theme, insets.bottom]);
  const router = useRouter();
  const { currentDate, dateList, schedulesByDate, isLoading, isError } = useCalendar();

  // 表示中の月の日付（初期表示なら今日）を、作成画面の初期日付にする
  const openCreateSchedule = () => {
    router.push({
      pathname: '/schedules/new',
      params: { date: format(currentDate, 'yyyy-MM-dd') },
    });
  };

  return (
    <View style={styles.root}>
      {/* 6週ある月は小さい画面に収まらないため、スクロールできるようにする */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title} testID="calendar-month-title">
          {format(currentDate, 'yyyy年M月')}
        </Text>
        <CalendarNav />

        {/* 日付の表示は予定データに依存しないため、読み込み中・失敗時もカレンダーは表示する */}
        {isLoading ? (
          <ActivityIndicator size="small" style={styles.status} />
        ) : isError ? (
          <Text style={[styles.status, styles.errorText]} testID="calendar-schedules-error">
            予定の取得に失敗しました
          </Text>
        ) : null}

        <View style={styles.table}>
          <CalendarHeader />
          <CalendarBody
            currentDate={currentDate}
            dateList={dateList}
            schedulesByDate={schedulesByDate}
          />
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={openCreateSchedule}
        accessibilityLabel="予定を作成"
        testID="calendar-create-schedule-button"
      />
    </View>
  );
};

const createStyles = (theme: AppTheme, bottomInset: number) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: Spacing.three,
      paddingTop: Spacing.four,
      // 最後の週が「＋」ボタンに隠れないよう、ボタンの分だけ空ける
      paddingBottom: Spacing.seven + Spacing.four + bottomInset,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: Spacing.two,
    },
    status: {
      marginBottom: Spacing.twoHalf,
    },
    errorText: {
      color: theme.colors.error,
    },
    table: {
      width: '100%',
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
    fab: {
      position: 'absolute',
      right: Spacing.three,
      bottom: Spacing.three + bottomInset,
    },
  });
