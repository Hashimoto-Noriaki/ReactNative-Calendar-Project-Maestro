import { useCalendarStore } from './calendar-store';

const getState = () => useCalendarStore.getState();

// Zustand のストアは React の外から直接操作できるため、act は使わない
describe('useCalendarStore', () => {
  beforeEach(() => {
    useCalendarStore.setState({ selectedScheduleId: null, isEditing: false });
  });

  describe('予定の選択', () => {
    it('selectSchedule で選択し、clearSelectedSchedule で解除する', () => {
      getState().selectSchedule(3);
      expect(getState().selectedScheduleId).toBe(3);

      getState().clearSelectedSchedule();
      expect(getState().selectedScheduleId).toBeNull();
    });
  });

  describe('予定の編集', () => {
    it('startEditing で編集中にし、stopEditing で詳細に戻る（選択は残る）', () => {
      getState().selectSchedule(3);
      getState().startEditing();
      expect(getState().isEditing).toBe(true);

      getState().stopEditing();
      expect(getState().isEditing).toBe(false);
      expect(getState().selectedScheduleId).toBe(3);
    });

    it('編集中に選択を解除すると、編集中も解除する', () => {
      getState().selectSchedule(3);
      getState().startEditing();
      getState().clearSelectedSchedule();
      expect(getState().isEditing).toBe(false);
    });

    it('別の予定を選び直すと、編集中を解除する', () => {
      getState().selectSchedule(3);
      getState().startEditing();
      getState().selectSchedule(4);
      expect(getState().selectedScheduleId).toBe(4);
      expect(getState().isEditing).toBe(false);
    });
  });
});
