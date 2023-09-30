import { DateTime } from "luxon";
import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import ComponentBox from "./components/ComponentBox";
import NavBar from "./components/NavBar";
import { WeekDate } from "./entities/WeekDate";
import { DisplayDayDate } from "./entities/DisplayDate";

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
      />
      <ComponentBox
        selectedTab={selectedTab}
        displayDayDate={displayDayDate}
        displayWeekDate={displayWeekDate}
      />
    </>
  );
}

export default App;
