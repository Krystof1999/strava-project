import DayBox from "./DayPage/DayBox";
import MonthBox from "./MonthPage/MonthBox";
import WeekBox from "./WeekPage/WeekBox";
import YearBox from "./YearPage/YearBox";

interface Props {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setFullMap: React.Dispatch<React.SetStateAction<boolean>>;
  fullMap: boolean;
}

const ComponentBox = ({
  selectedTab,
  setSelectedTab,
  fullMap,
  setFullMap,
}: Props) => {
  return (
    <div>
      {selectedTab === "DAY" && (
        <DayBox fullMap={fullMap} setFullMap={setFullMap} />
      )}
      {selectedTab === "WEEK" && <WeekBox setSelectedTab={setSelectedTab} />}
      {selectedTab === "MONTH" && <MonthBox setSelectedTab={setSelectedTab} />}
      {selectedTab === "YEAR" && <YearBox setSelectedTab={setSelectedTab} />}
    </div>
  );
};

export default ComponentBox;
