import { Redirect, Slot } from 'expo-router';
import { LoginLayout } from '@/components/organisms/login-layout';
import { useLoginUserStore } from '@/features/auth/stores/login-user-store';

export default function LoginGroupLayout() {
  const loginUser = useLoginUserStore((state) => state.loginUser);

  // ログインしていなければログイン画面へ
  if (loginUser.id === 0) return <Redirect href="/login" />;

  return (
    <LoginLayout>
      <Slot />
    </LoginLayout>
  );
}
