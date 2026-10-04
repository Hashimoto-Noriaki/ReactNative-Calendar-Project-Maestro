import { useState } from 'react';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { format, isValid, parseISO } from 'date-fns';

type PropsType = {
  value: string;
  onChange: (value: string) => void;
};

export const ScheduleDateField = ({ value, onChange }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  // 不正な日付文字列のときは今日を選択状態にする
  const parsed = parseISO(value);
  const selectedDate = isValid(parsed) ? parsed : new Date();

  return (
    <>
      <Button
        mode="outlined"
        icon="calendar"
        onPress={() => setIsOpen(true)}
        testID="schedule-date-button">
        {value}
      </Button>
      <DatePickerModal
        locale="ja"
        mode="single"
        visible={isOpen}
        date={selectedDate}
        onDismiss={() => setIsOpen(false)}
        onConfirm={({ date }) => {
          if (date) onChange(format(date, 'yyyy-MM-dd'));
          setIsOpen(false);
        }}
      />
    </>
  );
};
