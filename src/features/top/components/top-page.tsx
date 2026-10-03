import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { LogoText } from '@/components/atoms/logo-text';
import { PrimaryBtn } from '@/components/atoms/primary-btn';
import { Spacing } from '@/constants/theme';

// NotLoginLayout は (not-login)/_layout.tsx でかぶせる
export const TopPage = () => {
  return (
    <>
      <LogoText size="lg" />
      {/* titleMedium（16）の 2 倍 */}
      <Text variant="headlineLarge" style={styles.description}>
        お互いのスケジュールを管理するアプリです
      </Text>
      <View style={styles.buttonArea}>
        <PrimaryBtn>ログイン</PrimaryBtn>
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
