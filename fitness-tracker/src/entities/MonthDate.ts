interface WeekDays {
  start: string;
  end: string;
}

export interface MonthDate {
  start: string;
  end: string;
  monthName: string;
  month: number;
  year: number;
  weeksInMonth: WeekDays[];
}
