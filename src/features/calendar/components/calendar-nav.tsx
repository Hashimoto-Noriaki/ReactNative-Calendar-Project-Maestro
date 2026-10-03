import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { PrimaryBtn } from '@/components/atoms';
import { Spacing } from '@/constants/theme';
import { useCalendarStore } from '../stores/calendar-store';

export const CalendarNav = () => {
  const goToPrevMonth = useCalendarStore((state) => state.goToPrevMonth);
  const goToNextMonth = useCalendarStore((state) => state.goToNextMonth);
  const goToToday = useCalendarStore((state) => state.goToToday);

  return (
    <View style={styles.container}>
      <IconButton icon="chevron-left" onPress={goToPrevMonth} testID="calendar-prev-button" />
      <PrimaryBtn size="sm" onPress={goToToday} testID="calendar-today-button">
        今日
      </PrimaryBtn>
      <IconButton icon="chevron-right" onPress={goToNextMonth} testID="calendar-next-button" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
});
