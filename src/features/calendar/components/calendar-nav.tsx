import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { PrimaryBtn } from '@/components/atoms';
import { Spacing } from '@/constants/theme';
import { useCalendarStore } from '../stores/calendar-store';

export const CalendarNav = () => {
  const goToPrevMonth = useCalendarStore((state) => state.goToPrevMonth);
  const goToNextMonth = useCalendarStore((state) => state.goToNextMonth);
  const goToToday = useCalendarStore((state) => state.goToToday);

  return (
    <View style={styles.container}>
      <Button icon="chevron-left" onPress={goToPrevMonth} testID="calendar-prev-button">
        前月へ
      </Button>
      <PrimaryBtn size="sm" onPress={goToToday} testID="calendar-today-button">
        今日
      </PrimaryBtn>
      {/* アイコンを文字の右に置く */}
      <Button
        icon="chevron-right"
        onPress={goToNextMonth}
        contentStyle={styles.iconRight}
        testID="calendar-next-button">
        次月へ
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  iconRight: {
    flexDirection: 'row-reverse',
  },
});
