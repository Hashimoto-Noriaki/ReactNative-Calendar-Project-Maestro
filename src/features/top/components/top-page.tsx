import { View } from 'react-native';
import { Text } from 'react-native-paper';

export const TopPage = () => {
  return (
    <View>
      {/* ヘッダー */}
      <View>
        <Text>スケジュール管理App</Text>
        <View>
          <Text>利用方法</Text>
          <Text>ログイン</Text>
        </View>
      </View>
    </View>
  );
};
