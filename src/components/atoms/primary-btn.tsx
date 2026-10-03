import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type PropsType = {
  children: string;
  onPress: () => void;
  disabled?: boolean;
};

export const PrimaryBtn = ({ children, onPress, disabled }: PropsType) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      contentStyle={styles.content}
      labelStyle={styles.label}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
  },
});
