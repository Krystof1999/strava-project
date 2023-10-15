import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import ComponentBox from "./components/ComponentBox";
import { DayProvider } from "./components/DayPage";
import MonthProvider from "./components/MonthPage/MonthProvider";
import NavBar from "./components/NavBar";
import WeekProvider from "./components/WeekPage/WeekProvider";
import YearProvider from "./components/YearPage/YearProvider";

function App() {
  const [selectedTab, setSelectedTab] = useState("DAY");

  const [fullMap, setFullMap] = useState(false);

  return (
    <>
      <YearProvider>
        <MonthProvider>
          <WeekProvider>
            <DayProvider>
              {!fullMap ? (
                <>
                  <NavBar
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                  />
                  <ArrowComponent selectedTab={selectedTab} />
                </>
              ) : (
                ""
              )}

              <ComponentBox
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                fullMap={fullMap}
                setFullMap={setFullMap}
              />
            </DayProvider>
          </WeekProvider>
        </MonthProvider>
      </YearProvider>
    </>
  );
}

export default App;
