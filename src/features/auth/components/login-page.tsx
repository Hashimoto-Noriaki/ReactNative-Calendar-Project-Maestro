import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Input } from '@/components/atoms/input';
import { PrimaryBtn } from '@/components/atoms/primary-btn';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

export const LoginPage = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: ログインの仕組みが決まったら実装する
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
      <View style={styles.form}>
        <Input
          label="メールアドレス"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />
        <Input
          label="パスワード"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
          returnKeyType="done"
        />
      </View>
      <PrimaryBtn onPress={handleLogin}>ログイン</PrimaryBtn>
    </Surface>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      width: '100%',
      maxWidth: 400,
      gap: Spacing.four,
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
    form: {
      gap: Spacing.three,
    },
  });
