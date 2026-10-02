import type { Preview } from '@storybook/react-native-web-vite';

import { Colors } from '@/constants/theme';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'light', value: Colors.light.background },
        dark: { name: 'dark', value: Colors.dark.background },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
};

export default preview;
