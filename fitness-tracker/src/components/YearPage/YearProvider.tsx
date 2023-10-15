import { ReactNode, useState } from "react";
import YearContext from "./yearContext";
import { DateTime } from "luxon";
import { YearDate } from "../../entities/YearDate";

interface Props {
  children: ReactNode;
}

const YearProvider = ({ children }: Props) => {
  const todayDate = DateTime.now();
  const startTimeStampYear = Math.floor(todayDate.startOf("year").toSeconds());
  const endTimeStampYear = Math.floor(todayDate.endOf("year").toSeconds());
  const startYear = todayDate.year;

  const [displayYearDate, setDisplayYearDate] = useState<YearDate>({
    year: startYear,
    startTimeStamp: startTimeStampYear,
    endTimeStamp: endTimeStampYear,
  });
  return (
    <YearContext.Provider value={{ displayYearDate, setDisplayYearDate }}>
      {children}
    </YearContext.Provider>
  );
};

export default YearProvider;
