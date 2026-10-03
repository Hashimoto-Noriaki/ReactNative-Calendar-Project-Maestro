// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '.rnstorybook/storybook.requires.ts'],
  },
  {
    // 余白は src/constants/theme.ts の Spacing から取る（.claude/rules/mobile.md）
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Property[key.name=/^((margin|padding)(Top|Bottom|Left|Right|Horizontal|Vertical|Start|End)?|gap|rowGap|columnGap)$/][value.type="Literal"][value.raw=/^[0-9]/][value.raw!="0"]',
          message: '余白は数値で書かず、@/constants/theme の Spacing を使ってください。',
        },
      ],
    },
  },
]);
