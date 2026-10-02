// https://github.com/storybookjs/react-native
const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/withStorybook');

const config = getDefaultConfig(__dirname);

// Storybook is only bundled when STORYBOOK_ENABLED=true
module.exports = withStorybook(config);
