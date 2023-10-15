import { DisplayDayDate } from "../entities/DisplayDate";
import { MonthDate } from "../entities/MonthDate";
import { WeekDate } from "../entities/WeekDate";
import { YearDate } from "../entities/YearDate";
import DayBox from "./DayPage/DayBox";
import MonthBox from "./MonthPage/MonthBox";
import WeekBox from "./WeekPage/WeekBox";
import YearBox from "./YearPage/YearBox";

interface Props {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  displayDayDate: DisplayDayDate;
  setDisplayDayDate: React.Dispatch<React.SetStateAction<DisplayDayDate>>;
  displayWeekDate: WeekDate;
  displayMonthDate: MonthDate;
  displayYearDate: YearDate;
  setDisplayWeekDate: React.Dispatch<React.SetStateAction<WeekDate>>;
  setDisplayMonthDate: React.Dispatch<React.SetStateAction<MonthDate>>;
  setFullMap: React.Dispatch<React.SetStateAction<boolean>>;
  fullMap: boolean;
}

const ComponentBox = ({
  selectedTab,
  setSelectedTab,
  displayDayDate,
  setDisplayDayDate,
  displayWeekDate,
  displayMonthDate,
  displayYearDate,
  setDisplayWeekDate,
  setDisplayMonthDate,
  fullMap,
  setFullMap,
}: Props) => {
  return (
    <div>
      {selectedTab === "DAY" && (
        <DayBox
          displayDayDate={displayDayDate}
          fullMap={fullMap}
          setFullMap={setFullMap}
        />
      )}
      {selectedTab === "WEEK" && (
        <WeekBox
          displayWeekDate={displayWeekDate}
          setSelectedTab={setSelectedTab}
          setDisplayDayDate={setDisplayDayDate}
        />
      )}
      {selectedTab === "MONTH" && (
        <MonthBox
          displayMonthDate={displayMonthDate}
          setSelectedTab={setSelectedTab}
          setDisplayWeekDate={setDisplayWeekDate}
        />
      )}
      {selectedTab === "YEAR" && (
        <YearBox
          displayYearDate={displayYearDate}
          setSelectedTab={setSelectedTab}
          setDisplayMonthDate={setDisplayMonthDate}
        />
      )}
    </div>
  );
};

export default ComponentBox;
