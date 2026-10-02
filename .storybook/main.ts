import type { StorybookConfig } from '@storybook/react-native-web-vite';

// Web Storybook. Stories are shared with the on-device Storybook in .rnstorybook/
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)'],
  framework: '@storybook/react-native-web-vite',
  core: {
    disableTelemetry: true,
  },
};

export default config;
