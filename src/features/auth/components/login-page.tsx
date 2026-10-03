import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, Surface, Text } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/atoms/input';
import { PrimaryBtn } from '@/components/atoms/primary-btn';
import type { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { login } from '../api/login';
import { loginSchema, type LoginSchemaType } from '../schemas/login-schema';

export const LoginPage = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [errorMessage, setErrorMessage] = useState('');

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
      login(data);
    } catch {
      setErrorMessage('ログインに失敗しました');
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text variant="headlineSmall" style={styles.title}>
          ログイン
        </Text>

        {errorMessage !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText} testID="login-error-message">
              {errorMessage}
            </Text>
          </View>
        )}

        <View style={styles.field}>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.email}
                testID="login-email-input"
              />
            )}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
        </View>

        <View style={styles.field}>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.password}
                testID="login-password-input"
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
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    card: {
      width: '100%',
      maxWidth: 500,
      alignItems: 'center',
      gap: 16,
      paddingVertical: 40,
      borderRadius: 8,
    },
    title: {
      fontWeight: 'bold',
    },
    errorBox: {
      width: '80%',
      padding: 16,
      borderRadius: 8,
      backgroundColor: theme.colors.errorContainer,
    },
    errorText: {
      color: theme.colors.onErrorContainer,
    },
    field: {
      width: '80%',
    },
  });
