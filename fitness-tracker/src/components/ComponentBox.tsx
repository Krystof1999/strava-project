import { DisplayDayDate } from "../entities/DisplayDate";
import { MonthDate } from "../entities/MonthDate";
import { WeekDate } from "../entities/WeekDate";
import DayBox from "./DayPage/DayBox";
import MonthBox from "./MonthPage/MonthBox";
import WeekBox from "./WeekPage/WeekBox";

interface Props {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  displayDayDate: DisplayDayDate;
  setDisplayDayDate: React.Dispatch<React.SetStateAction<DisplayDayDate>>;
  displayWeekDate: WeekDate;
  displayMonthDate: MonthDate;
}

const ComponentBox = ({
  selectedTab,
  setSelectedTab,
  displayDayDate,
  setDisplayDayDate,
  displayWeekDate,
  displayMonthDate,
}: Props) => {
  return (
    <div>
      {selectedTab === "DAY" && <DayBox displayDayDate={displayDayDate} />}
      {selectedTab === "WEEK" && (
        <WeekBox
          displayWeekDate={displayWeekDate}
          setSelectedTab={setSelectedTab}
          setDisplayDayDate={setDisplayDayDate}
        />
      )}
      {selectedTab === "MONTH" && (
        <MonthBox displayMonthDate={displayMonthDate} />
      )}
    </div>
  );
};

export default ComponentBox;
