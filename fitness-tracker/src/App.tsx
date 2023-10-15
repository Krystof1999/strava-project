import { DateTime } from "luxon";
import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import ComponentBox from "./components/ComponentBox";
import { DayProvider } from "./components/DayPage";
import NavBar from "./components/NavBar";
import { getWeeksInMonth } from "./components/utils/dateUtils";
import { MonthDate } from "./entities/MonthDate";
import { YearDate } from "./entities/YearDate";
import WeekProvider from "./components/WeekPage/WeekProvider";

function App() {
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

  // Calculate timestamps for year view
  const startTimeStampYear = Math.floor(todayDate.startOf("year").toSeconds());
  const endTimeStampYear = Math.floor(todayDate.endOf("year").toSeconds());

  const [displayYearDate, setDisplayYearDate] = useState<YearDate>({
    year: startYear,
    startTimeStamp: startTimeStampYear,
    endTimeStamp: endTimeStampYear,
  });

  const [selectedTab, setSelectedTab] = useState("DAY");

  const [fullMap, setFullMap] = useState(false);

  return (
    <>
      <WeekProvider>
        <DayProvider>
          {!fullMap ? (
            <>
              <NavBar
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
              />
              <ArrowComponent
                selectedTab={selectedTab}
                displayMonthDate={displayMonthDate}
                setDisplayMonthDate={setDisplayMonthDate}
                displayYearDate={displayYearDate}
                setDisplayYearDate={setDisplayYearDate}
              />
            </>
          ) : (
            ""
          )}

          <ComponentBox
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            displayMonthDate={displayMonthDate}
            displayYearDate={displayYearDate}
            setDisplayMonthDate={setDisplayMonthDate}
            fullMap={fullMap}
            setFullMap={setFullMap}
          />
        </DayProvider>
      </WeekProvider>
    </>
  );
}

export default App;
