import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useLoginUserStore } from '@/features/auth/stores/login-user-store';

export const CalendarPage = () => {
  const loginUser = useLoginUserStore((state) => state.loginUser);

  return (
    <View style={styles.container}>
      <Text>ID: {loginUser.id}</Text>
      <Text>名前: {loginUser.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
