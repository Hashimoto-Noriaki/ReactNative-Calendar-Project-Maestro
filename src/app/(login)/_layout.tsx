import { Redirect, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { LoginLayout } from '@/components/organisms/login-layout';
import { useLoginUserStore } from '@/features/auth/stores/login-user-store';

export default function LoginGroupLayout() {
  const loginUser = useLoginUserStore((state) => state.loginUser);

  // ログインしていなければログイン画面へ
  if (loginUser.id === 0) return <Redirect href="/login" />;

  return (
    <LoginLayout>
      {/* 予定作成から戻れるよう Stack にする。背景は LoginLayout のグラデーションを見せる */}
      <Stack screenOptions={{ headerShown: false, contentStyle: styles.content }}>
        <Stack.Screen name="schedules/new" options={{ presentation: 'modal' }} />
      </Stack>
    </LoginLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'transparent',
  },
});
