import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3f6212', // lime-800
    onPrimary: '#ffffff',
    // アプリ独自の色
    headerBackground: '#ffffff',
    gradientStart: '#ecfccb', // lime-100
    gradientEnd: '#d9f99d', // lime-200
    logoText: '#ffffff',
    logoShadow: '#3f6212',
  },
};

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#a3e635', // lime-400
    onPrimary: '#1a2e05', // lime-950
    headerBackground: '#1c1b1f',
    gradientStart: '#1a2e05',
    gradientEnd: '#365314',
    logoText: '#ffffff',
    logoShadow: '#65a30d',
  },
};
