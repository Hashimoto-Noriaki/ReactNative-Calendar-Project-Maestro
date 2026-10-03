import { useTheme } from 'react-native-paper';
import type { AppTheme } from '@/constants/theme';

export const useAppTheme = () => useTheme<AppTheme>();
