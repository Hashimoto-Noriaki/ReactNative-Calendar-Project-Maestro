import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Spacing } from '@/constants/theme';

type PropsType = {
  size?: 'sm' | 'lg';
  onPress: () => void;
  disabled?: boolean;
  children: string;
  testID?: string;
  loading?: boolean;
};

export const PrimaryBtn = ({
  size = 'lg',
  children,
  onPress,
  disabled,
  loading,
  testID,
}: PropsType) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      testID={testID}
      loading={loading}
      // 送信中は押せないようにする
      disabled={Boolean(disabled || loading)}
      contentStyle={size === 'lg' ? styles.contentLg : styles.contentSm}
      labelStyle={size === 'lg' ? styles.labelLg : styles.labelSm}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  contentLg: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  labelLg: {
    fontSize: 18,
  },
  contentSm: {
    paddingHorizontal: Spacing.one,
  },
  labelSm: {
    fontSize: 14,
  },
});
