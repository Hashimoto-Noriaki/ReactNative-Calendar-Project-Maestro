import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { LogoText } from '@/components/atoms/logo-text';
import { PrimaryBtn } from '@/components/atoms/primary-btn';
import { NotLoginLayout } from '@/components/organisms/not-login-layout';

export const TopPage = () => {
  return (
    <NotLoginLayout>
      <LogoText size="lg" />
      <Text variant="titleMedium" style={styles.description}>
        お互いのスケジュールを管理するアプリです
      </Text>
      <View style={styles.buttonArea}>
        <PrimaryBtn>ログイン</PrimaryBtn>
      </View>
    </NotLoginLayout>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: 40,
    textAlign: 'center',
  },
  buttonArea: {
    marginTop: 80,
  },
});
