export interface CalendarState {
  month: number;
  year: number;
  nextMonth: () => void;
  prevMonth: () => void;
}
