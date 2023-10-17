import DayBox from "./DayPage/DayBox";
import MonthBox from "./MonthPage/MonthBox";
import useSelectedTabContext from "./SelectedTab/useSelectedTabContext";
import WeekBox from "./WeekPage/WeekBox";
import YearBox from "./YearPage/YearBox";

const ComponentBox = () => {
  const { selectedTab } = useSelectedTabContext();

  return (
    <div>
      {selectedTab === "DAY" && <DayBox />}
      {selectedTab === "WEEK" && <WeekBox />}
      {selectedTab === "MONTH" && <MonthBox />}
      {selectedTab === "YEAR" && <YearBox />}
    </div>
  );
};

export default ComponentBox;
