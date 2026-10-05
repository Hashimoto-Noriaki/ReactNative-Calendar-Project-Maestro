import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { LogoText } from '@/components/atoms/logo-text';
import { PrimaryBtn } from '@/components/atoms/primary-btn';
import { Spacing } from '@/constants/theme';

export const TopPage = () => {
  const router = useRouter();
  return (
    <>
      <LogoText size="lg" />
      {/* titleMedium（16）の 2 倍 */}
      <Text variant="headlineLarge" style={styles.description}>
        お互いのスケジュールを管理するアプリです
      </Text>
      <View style={styles.buttonArea}>
        <PrimaryBtn onPress={() => router.push('/login')} testID="top-login-button">
          ログイン
        </PrimaryBtn>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: Spacing.fiveHalf,
    textAlign: 'center',
  },
  buttonArea: {
    marginTop: Spacing.seven,
  },
});
