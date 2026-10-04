import { addMonths } from 'date-fns';
import { create } from 'zustand';

type CalendarState = {
  currentDate: Date;
  selectedScheduleId: number | null;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  selectSchedule: (id: number) => void;
  clearSelectedSchedule: () => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  selectedScheduleId: null,
  goToPrevMonth: () => set((state) => ({ currentDate: addMonths(state.currentDate, -1) })),
  goToNextMonth: () => set((state) => ({ currentDate: addMonths(state.currentDate, 1) })),
  goToToday: () => set({ currentDate: new Date() }),
  selectSchedule: (id) => set({ selectedScheduleId: id }),
  clearSelectedSchedule: () => set({ selectedScheduleId: null }),
}));
