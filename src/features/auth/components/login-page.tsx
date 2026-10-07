import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, Surface, Text } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/atoms/input';
import { PrimaryBtn } from '@/components/atoms/primary-btn';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { login } from '../api/login';
import { loginSchema, type LoginSchemaType } from '../schemas/login-schema';
import { useRouter } from 'expo-router';
import { useLoginUserStore } from '../stores/login-user-store';

export const LoginPage = () => {
  const router = useRouter();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [errorMessage, setErrorMessage] = useState('');
  const setLoginUser = useLoginUserStore((state) => state.setLoginUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginSchemaType) => {
    setErrorMessage('');
    try {
      const user = login(data);
      setLoginUser(user);
      router.replace('/calendar');
    } catch {
      setErrorMessage('ログインに失敗しました');
    }
  };

  return (
    <Surface style={styles.card} elevation={2}>
      <View style={styles.heading}>
        <Text variant="headlineSmall" style={styles.title}>
          ログイン
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          メールアドレスとパスワードを入力してください
        </Text>
      </View>

      {errorMessage !== '' && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText} testID="login-error-message">
            {errorMessage}
          </Text>
        </View>
      )}

      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              label="メールアドレス"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.email}
              testID="login-email-input"
              // Maestro Web は DOM の id で入力先を特定するため、testID と同じ値を付ける
              id="login-email-input"
            />
          )}
        />
        <HelperText type="error" visible={!!errors.email}>
          {errors.email?.message}
        </HelperText>

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              label="パスワード"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.password}
              testID="login-password-input"
              // Maestro Web は DOM の id で入力先を特定するため、testID と同じ値を付ける
              id="login-password-input"
            />
          )}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password?.message}
        </HelperText>
      </View>

      <PrimaryBtn onPress={handleSubmit(onSubmit)} testID="login-submit-button">
        ログイン
      </PrimaryBtn>
    </Surface>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      width: '100%',
      maxWidth: 400,
      gap: Spacing.three,
      paddingHorizontal: Spacing.four,
      paddingVertical: Spacing.five,
      borderRadius: theme.roundness * 3,
      backgroundColor: theme.colors.cardBackground,
    },
    heading: {
      gap: Spacing.two,
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.primary,
    },
    subtitle: {
      textAlign: 'center',
      color: theme.colors.onSurfaceVariant,
    },
    errorBox: {
      padding: Spacing.three,
      borderRadius: theme.roundness * 2,
      backgroundColor: theme.colors.errorContainer,
    },
    errorText: {
      color: theme.colors.onErrorContainer,
    },
  });
