import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

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
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
  },
});
