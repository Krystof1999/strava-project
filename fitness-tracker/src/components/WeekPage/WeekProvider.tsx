import { ReactNode, useState } from "react";
import WeekContext from "./weekContext";
import { WeekDate } from "../../entities/WeekDate";
import { DateTime } from "luxon";

const todayDate = DateTime.now();

const startOfWeek = todayDate.startOf("week");
const endOfWeek = todayDate.endOf("week");

const formattedStartOfWeek = startOfWeek.toFormat("dd.MM.yyyy");
const formattedEndOfWeek = endOfWeek.toFormat("dd.MM.yyyy");

// Calculate timestamps for the next week
const startWeekTimeStamp = Math.floor(startOfWeek.toSeconds());
const endWeekTimeStamp = Math.floor(endOfWeek.toSeconds());

interface Props {
  children: ReactNode;
}

const WeekProvider = ({ children }: Props) => {
  const [displayWeekDate, setDisplayWeekDate] = useState<WeekDate>({
    start: formattedStartOfWeek,
    end: formattedEndOfWeek,
    startTimeStamp: startWeekTimeStamp,
    endTimeStamp: endWeekTimeStamp,
  });
  return (
    <WeekContext.Provider value={{ displayWeekDate, setDisplayWeekDate }}>
      {children}
    </WeekContext.Provider>
  );
};

export default WeekProvider;
