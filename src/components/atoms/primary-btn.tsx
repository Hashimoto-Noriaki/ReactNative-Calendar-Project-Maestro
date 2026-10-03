import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Spacing } from '@/constants/theme';

type PropsType = {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
};

export const PrimaryBtn = ({ children, onPress, disabled, testID }: PropsType) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      contentStyle={styles.content}
      labelStyle={styles.label}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  label: {
    fontSize: 18,
  },
});
