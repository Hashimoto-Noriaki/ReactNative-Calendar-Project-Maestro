import { Slot, useRouter } from 'expo-router';
import { LoginLayout } from '@/components/organisms/login-layout';
import { useLoginUserStore } from '@/features/auth/stores/login-user-store';

export default function LoginGroupLayout() {
  const router = useRouter();
  const loginUser = useLoginUserStore((state) => state.loginUser);
  const logout = useLoginUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <LoginLayout userName={loginUser.name} onLogout={handleLogout}>
      <Slot />
    </LoginLayout>
  );
}
