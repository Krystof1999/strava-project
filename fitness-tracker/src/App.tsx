import { DateTime } from "luxon";
import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import ComponentBox from "./components/ComponentBox";
import NavBar from "./components/NavBar";
import { WeekDate } from "./entities/WeekDate";
import { DisplayDayDate } from "./entities/DisplayDate";
import { MonthDate } from "./entities/MonthDate";
import { getWeeksInMonth } from "./components/utils/dateUtils";

function App() {
  const todayDate = DateTime.now();

  const startDay = todayDate.day;
  const startMonth = todayDate.month;
  const startYear = todayDate.year;

  const [displayDayDate, setDisplayDayDate] = useState<DisplayDayDate>({
    day: startDay,
    month: startMonth,
    year: startYear,
  });

  const startOfWeek = todayDate.startOf("week");
  const endOfWeek = todayDate.endOf("week");

  const formattedStartOfWeek = startOfWeek.toFormat("dd.MM.yyyy");
  const formattedEndOfWeek = endOfWeek.toFormat("dd.MM.yyyy");

  // Calculate timestamps for the next week
  const startWeekTimeStamp = Math.floor(startOfWeek.toSeconds());
  const endWeekTimeStamp = Math.floor(endOfWeek.toSeconds());

  const [displayWeekDate, setDisplayWeekDate] = useState<WeekDate>({
    start: formattedStartOfWeek,
    end: formattedEndOfWeek,
    startTimeStamp: startWeekTimeStamp,
    endTimeStamp: endWeekTimeStamp,
  });

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

  return (
    <>
      <NavBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <ArrowComponent
        selectedTab={selectedTab}
        displayDayDate={displayDayDate}
        setDisplayDayDate={setDisplayDayDate}
        displayWeekDate={displayWeekDate}
        setDisplayWeekDate={setDisplayWeekDate}
        displayMonthDate={displayMonthDate}
        setDisplayMonthDate={setDisplayMonthDate}
      />
      <ComponentBox
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        displayDayDate={displayDayDate}
        setDisplayDayDate={setDisplayDayDate}
        displayWeekDate={displayWeekDate}
        displayMonthDate={displayMonthDate}
      />
    </>
  );
}

export default App;
