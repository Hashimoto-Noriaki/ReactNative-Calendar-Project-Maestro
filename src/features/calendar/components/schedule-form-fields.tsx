import { StyleSheet } from 'react-native';
import { HelperText } from 'react-native-paper';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { Input } from '@/components/atoms';
import type { ScheduleFormData } from '../schemas/schedule-schema';
import { ScheduleDateField } from './schedule-date-field';

type PropsType = {
  control: Control<ScheduleFormData>;
  errors: FieldErrors<ScheduleFormData>;
};

export const ScheduleFormFields = ({ control, errors }: PropsType) => {
  return (
    <>
      {/* タイトル */}
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="タイトル"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.title}
            testID="schedule-title-input"
            // Maestro Web は DOM の id で入力先を特定するため、testID と同じ値を付ける
            id="schedule-title-input"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.title}>
        {errors.title?.message}
      </HelperText>

      {/* 日付 */}
      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange } }) => (
          <ScheduleDateField value={value} onChange={onChange} />
        )}
      />
      <HelperText type="error" visible={!!errors.date}>
        {errors.date?.message}
      </HelperText>

      {/* 内容 */}
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="内容"
            multiline
            numberOfLines={4}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.textarea}
            testID="schedule-description-input"
            // Maestro Web は DOM の id で入力先を特定するため、testID と同じ値を付ける
            id="schedule-description-input"
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textarea: {
    minHeight: 100,
  },
});
