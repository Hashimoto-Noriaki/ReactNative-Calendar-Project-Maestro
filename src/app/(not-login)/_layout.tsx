import { Slot } from 'expo-router';
import { NotLoginLayout } from '@/components/organisms/not-login-layout';

export default function NotLoginGroupLayout() {
  return (
    <NotLoginLayout>
      <Slot />
    </NotLoginLayout>
  );
}
