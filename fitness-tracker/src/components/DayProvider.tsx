import { ReactNode, useState } from "react";
import { DisplayDayDate } from "../entities/DisplayDate";
import DayContext from "./contexts/dayContext";
import { DateTime } from "luxon";

interface Props {
  children: ReactNode;
}

const todayDate = DateTime.now();

const startDay = todayDate.day;
const startMonth = todayDate.month;
const startYear = todayDate.year;

const DayProvider = ({ children }: Props) => {
  const [displayDayDate, setDisplayDayDate] = useState<DisplayDayDate>({
    day: startDay,
    month: startMonth,
    year: startYear,
  });

  return (
    <DayContext.Provider value={{ displayDayDate, setDisplayDayDate }}>
      {children}
    </DayContext.Provider>
  );
};

export default DayProvider;
