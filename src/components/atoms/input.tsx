import { TextInput, type TextInputProps } from 'react-native-paper';

export const Input = (props: TextInputProps) => {
  return <TextInput mode="outlined" {...props} />;
};
