import ArrowComponent from "./components/ArrowComponent";
import ComponentBox from "./components/ComponentBox";
import { DayProvider } from "./components/DayPage";
import useMapContext from "./components/Map/useMapContext";
import { MonthProvider } from "./components/MonthPage";
import NavBar from "./components/NavBar";
import SelectedTabProvider from "./components/SelectedTab/SelectedTabProvider";
import { WeekProvider } from "./components/WeekPage";
import { YearProvider } from "./components/YearPage";

function App() {
  const { fullMap } = useMapContext();
  return (
    <>
      <YearProvider>
        <MonthProvider>
          <WeekProvider>
            <DayProvider>
              <SelectedTabProvider>
                {!fullMap && (
                  <>
                    <NavBar /> <ArrowComponent />
                  </>
                )}
                <ComponentBox />
              </SelectedTabProvider>
            </DayProvider>
          </WeekProvider>
        </MonthProvider>
      </YearProvider>
    </>
  );
}

export default App;
