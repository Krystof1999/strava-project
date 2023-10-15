import { ReactNode, useState } from "react";
import MonthContext from "./monthContext";
import { DateTime } from "luxon";
import { getWeeksInMonth } from "../utils/dateUtils";
import { MonthDate } from "../../entities/MonthDate";

interface Props {
  children: ReactNode;
}

const MonthProvider = ({ children }: Props) => {
  const todayDate = DateTime.now();
  const startMonth = todayDate.month;
  const startYear = todayDate.year;

  const currentMonth = todayDate.toFormat("MMMM");
  const weeksInMonth = getWeeksInMonth(todayDate.year, todayDate.month);

  // Find the first and last weeks in weeksInMonth
  const start = weeksInMonth[0].start;
  const end = weeksInMonth[weeksInMonth.length - 1].end;

  const [displayMonthDate, setDisplayMonthDate] = useState<MonthDate>({
    start: start,
    end: end,
    monthName: currentMonth,
    month: startMonth,
    year: startYear,
    weeksInMonth: weeksInMonth,
  });

  return (
    <MonthContext.Provider value={{ displayMonthDate, setDisplayMonthDate }}>
      {children}
    </MonthContext.Provider>
  );
};

export default MonthProvider;
