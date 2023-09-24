import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import NavBar from "./components/NavBar";
import ComponentBox from "./components/ComponentBox";
import { DateTime } from "luxon";
// import Test from "./components/Test";

export interface DisplayDate {
  day: number;
  month: number;
  year: number;
}

function App() {
  const dateNow = DateTime.now();

  const startDay = dateNow.day;
  const startMonth = dateNow.month;
  const startYear = dateNow.year;

  const [displayDate, setDisplayDate] = useState<DisplayDate>({
    day: startDay,
    month: startMonth,
    year: startYear,
  });

  const [selectedTab, setSelectedTab] = useState("DEN");

  return (
    <>
      {/* <Test /> */}
      <NavBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <ArrowComponent
        selectedTab={selectedTab}
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
      />
      <ComponentBox selectedTab={selectedTab} displayDate={displayDate} />
    </>
  );
}

export default App;
