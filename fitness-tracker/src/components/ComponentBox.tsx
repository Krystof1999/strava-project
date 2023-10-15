import { MonthDate } from "../entities/MonthDate";
import { YearDate } from "../entities/YearDate";
import DayBox from "./DayPage/DayBox";
import MonthBox from "./MonthPage/MonthBox";
import WeekBox from "./WeekPage/WeekBox";
import YearBox from "./YearPage/YearBox";

interface Props {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  displayMonthDate: MonthDate;
  displayYearDate: YearDate;
  setDisplayMonthDate: React.Dispatch<React.SetStateAction<MonthDate>>;
  setFullMap: React.Dispatch<React.SetStateAction<boolean>>;
  fullMap: boolean;
}

const ComponentBox = ({
  selectedTab,
  setSelectedTab,
  displayMonthDate,
  displayYearDate,
  setDisplayMonthDate,
  fullMap,
  setFullMap,
}: Props) => {
  return (
    <div>
      {selectedTab === "DAY" && (
        <DayBox fullMap={fullMap} setFullMap={setFullMap} />
      )}
      {selectedTab === "WEEK" && <WeekBox setSelectedTab={setSelectedTab} />}
      {selectedTab === "MONTH" && (
        <MonthBox
          displayMonthDate={displayMonthDate}
          setSelectedTab={setSelectedTab}
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
