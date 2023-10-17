import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import ComponentBox from "./components/ComponentBox";
import { DayProvider } from "./components/DayPage";
import NavBar from "./components/NavBar";
import SelectedTabProvider from "./components/SelectedTab/SelectedTabProvider";
import { MonthProvider } from "./components/MonthPage";
import { WeekProvider } from "./components/WeekPage";
import { YearProvider } from "./components/YearPage";

function App() {
  const [fullMap, setFullMap] = useState(false);

  return (
    <>
      <YearProvider>
        <MonthProvider>
          <WeekProvider>
            <DayProvider>
              <SelectedTabProvider>
                {!fullMap ? (
                  <>
                    <NavBar />
                    <ArrowComponent />
                  </>
                ) : (
                  ""
                )}

                <ComponentBox fullMap={fullMap} setFullMap={setFullMap} />
              </SelectedTabProvider>
            </DayProvider>
          </WeekProvider>
        </MonthProvider>
      </YearProvider>
    </>
  );
}

export default App;
