import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { USE_MOCK } from '@/constants/api';
import { darkTheme, lightTheme } from '@/constants/theme';
import { server } from '@/mocks/server';

// モックを使う設定のときだけMSWを起動（追記）
if (USE_MOCK) {
  server.listen({ onUnhandledRequest: 'bypass' });
}

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
