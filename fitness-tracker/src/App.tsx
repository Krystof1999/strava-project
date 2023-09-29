import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import NavBar from "./components/NavBar";
import ComponentBox from "./components/ComponentBox";
import { DateTime } from "luxon";
import { DisplayDate } from "./entities/DisplayDate";
import { WeekDate } from "./entities/WeekDate";
// import Test from "./components/Test";

function App() {
  const todayDate = DateTime.now();

  const startDay = todayDate.day;
  const startMonth = todayDate.month;
  const startYear = todayDate.year;

  const [displayDate, setDisplayDate] = useState<DisplayDate>({
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
      {/* <Test /> */}
      <NavBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <ArrowComponent
        selectedTab={selectedTab}
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        displayWeekDate={displayWeekDate}
        setDisplayWeekDate={setDisplayWeekDate}
      />
      <ComponentBox
        selectedTab={selectedTab}
        displayDate={displayDate}
        displayWeekDate={displayWeekDate}
      />
    </>
  );
}

export default App;
