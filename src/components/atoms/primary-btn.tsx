import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Spacing } from '@/constants/theme';

type PropsType = {
  children: string;
};

export const PrimaryBtn = ({ children }: PropsType) => {
  return (
    <Button mode="contained" contentStyle={styles.content} labelStyle={styles.label}>
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
