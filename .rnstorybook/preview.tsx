import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import type { Preview } from '@storybook/react-native';

import { Colors } from '@/constants/theme';

const preview: Preview = {
  decorators: [withBackgrounds],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: Colors.light.background },
        { name: 'dark', value: Colors.dark.background },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
