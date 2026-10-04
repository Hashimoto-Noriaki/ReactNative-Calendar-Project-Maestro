import { addMonths } from 'date-fns';
import { create } from 'zustand';

type CalendarState = {
  currentDate: Date;
  selectedScheduleId: number | null;
  // 選択中の予定を編集しているか（詳細と編集のモーダルを切り替える）
  isEditing: boolean;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  selectSchedule: (id: number) => void;
  clearSelectedSchedule: () => void;
  startEditing: () => void;
  stopEditing: () => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  selectedScheduleId: null,
  isEditing: false,
  goToPrevMonth: () => set((state) => ({ currentDate: addMonths(state.currentDate, -1) })),
  goToNextMonth: () => set((state) => ({ currentDate: addMonths(state.currentDate, 1) })),
  goToToday: () => set({ currentDate: new Date() }),
  selectSchedule: (id) => set({ selectedScheduleId: id, isEditing: false }),
  clearSelectedSchedule: () => set({ selectedScheduleId: null, isEditing: false }),
  startEditing: () => set({ isEditing: true }),
  stopEditing: () => set({ isEditing: false }),
}));
