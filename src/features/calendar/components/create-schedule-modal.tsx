import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { ErrorMessage, PrimaryBtn } from '@/components/atoms';
import { Spacing, type AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useScheduleForm } from '../hooks/use-schedule-form';
import { ScheduleFormFields } from './schedule-form-fields';

type PropsType = {
  visible: boolean;
  onClose: () => void;
};

export const CreateScheduleModal = ({ visible, onClose }: PropsType) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { control, errors, onSubmit, handleClose, isPending, errorMessage } = useScheduleForm({
    onClose,
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleClose}
        // 送信中は背景をタップしても閉じない
        dismissable={!isPending}
        contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          予定作成
        </Text>

        <ErrorMessage testID="schedule-error-message">{errorMessage}</ErrorMessage>
        <ScheduleFormFields control={control} errors={errors} />

        <View style={styles.buttonArea}>
          <PrimaryBtn
            size="lg"
            onPress={onSubmit}
            loading={isPending}
            testID="schedule-submit-button">
            作成
          </PrimaryBtn>
        </View>
      </Modal>
    </Portal>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: Spacing.three,
      padding: Spacing.four,
      borderRadius: theme.roundness * 3,
      backgroundColor: theme.colors.surface,
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.primary,
      marginBottom: Spacing.three,
    },
    buttonArea: {
      alignItems: 'center',
      marginTop: Spacing.four,
    },
  });
