import { DateTime } from "luxon";
import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import ComponentBox from "./components/ComponentBox";
import { DayProvider } from "./components/DayPage";
import NavBar from "./components/NavBar";
import WeekProvider from "./components/WeekPage/WeekProvider";
import YearProvider from "./components/YearPage/YearProvider";
import { getWeeksInMonth } from "./components/utils/dateUtils";
import { MonthDate } from "./entities/MonthDate";

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

  const [selectedTab, setSelectedTab] = useState("DAY");

  const [fullMap, setFullMap] = useState(false);

  return (
    <>
      <YearProvider>
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
                />
              </>
            ) : (
              ""
            )}

            <ComponentBox
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              displayMonthDate={displayMonthDate}
              setDisplayMonthDate={setDisplayMonthDate}
              fullMap={fullMap}
              setFullMap={setFullMap}
            />
          </DayProvider>
        </WeekProvider>
      </YearProvider>
    </>
  );
}

export default App;
