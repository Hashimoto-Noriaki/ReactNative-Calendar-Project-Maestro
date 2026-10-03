import { addMonths } from 'date-fns';
import { create } from 'zustand';

type CalendarState = {
  currentDate: Date;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  goToPrevMonth: () => set((state) => ({ currentDate: addMonths(state.currentDate, -1) })),
  goToNextMonth: () => set((state) => ({ currentDate: addMonths(state.currentDate, 1) })),
  goToToday: () => set({ currentDate: new Date() }),
}));
