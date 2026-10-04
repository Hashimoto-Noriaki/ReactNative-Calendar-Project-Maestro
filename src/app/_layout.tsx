import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { USE_MOCK } from '@/constants/api';
import { darkTheme, lightTheme } from '@/constants/theme';
import { ja, registerTranslation } from 'react-native-paper-dates';

registerTranslation('ja', ja);
// モックを使う設定のときだけ MSW とポリフィルを読み込んで起動する
if (USE_MOCK) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { server } = require('@/mocks/server') as typeof import('@/mocks/server');
  server.listen({ onUnhandledRequest: 'bypass' });
}

const queryClient = new QueryClient({
  defaultOptions: {
    // 接続先が起動していないときに、エラー表示まで待たされないようにする
    queries: { retry: 1 },
  },
});

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
