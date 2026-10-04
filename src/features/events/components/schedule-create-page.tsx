import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, PrimaryBtn } from '@/components/atoms';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useCreateSchedule } from '../hooks/use-create-schedule';
import {
  DESCRIPTION_MAX_LENGTH,
  scheduleFormSchema,
  TITLE_MAX_LENGTH,
  type ScheduleFormSchemaType,
} from '../schemas/schedule-form-schema';
import { isDateString, toDateString } from '../utils/date-string';
import { DateField } from './date-field';

type PropsType = {
  initialDate?: string; // "yyyy-MM-dd"。省略時や形式が正しくないときは今日
};

export const ScheduleCreatePage = ({ initialDate }: PropsType) => {
  const router = useRouter();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { mutate, isPending, isError } = useCreateSchedule();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormSchemaType>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      title: '',
      date: initialDate && isDateString(initialDate) ? initialDate : toDateString(new Date()),
      description: '',
    },
  });

  // Web ではモーダルが別のページとして開くため、戻れないときはカレンダーへ移動する
  const close = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/calendar');
    }
  };

  const onSubmit = (data: ScheduleFormSchemaType) => {
    mutate(data, { onSuccess: close });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text variant="headlineSmall" style={styles.title}>
        予定を作成
      </Text>

      {isError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText} testID="schedule-create-error">
            予定の作成に失敗しました。もう一度お試しください
          </Text>
        </View>
      )}

      <View>
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              label="タイトル"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={TITLE_MAX_LENGTH}
              error={!!errors.title}
              testID="schedule-title-input"
            />
          )}
        />
        <HelperText type="error" visible={!!errors.title}>
          {errors.title?.message}
        </HelperText>

        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <DateField
              label="日付"
              value={value}
              onChange={onChange}
              testID="schedule-date-input"
            />
          )}
        />
        <HelperText type="error" visible={!!errors.date}>
          {errors.date?.message}
        </HelperText>

        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              label="説明"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              maxLength={DESCRIPTION_MAX_LENGTH}
              error={!!errors.description}
              testID="schedule-description-input"
            />
          )}
        />
        <HelperText type="error" visible={!!errors.description}>
          {errors.description?.message}
        </HelperText>
      </View>

      <View style={styles.actions}>
        <Button onPress={close} disabled={isPending} testID="schedule-cancel-button">
          キャンセル
        </Button>
        <PrimaryBtn
          size="sm"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          testID="schedule-submit-button">
          {isPending ? '保存中…' : '保存'}
        </PrimaryBtn>
      </View>
    </ScrollView>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      gap: Spacing.three,
      padding: Spacing.four,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontWeight: 'bold',
    },
    errorBox: {
      padding: Spacing.three,
      borderRadius: theme.roundness * 2,
      backgroundColor: theme.colors.errorContainer,
    },
    errorText: {
      color: theme.colors.onErrorContainer,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: Spacing.two,
    },
  });
