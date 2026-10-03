import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Text>ログインページ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
