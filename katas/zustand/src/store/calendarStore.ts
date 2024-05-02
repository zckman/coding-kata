// calendarStore.ts
import { create } from "zustand";
import { CalendarState } from "../types/calendarTypes";

/**
 * TODO: Add a calendar store
 * 1. Add a state that tracks the month, year, nextMonth and previous month
 * 2. Test the integration in the Calendar component
 */

export const useCalendarStore = create<CalendarState>((set) => ({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),

  nextMonth: () =>
    set((state) => {
      // update this function to return the new date that will show the next month
      return { month: state.month, year: state.year };
    }),
  prevMonth: () =>
    set((state) => {
      // update this function to return the new date that will show the previous month
      return { month: state.month, year: state.year };
    }),
}));
