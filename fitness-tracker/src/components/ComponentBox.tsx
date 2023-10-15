import DayBox from "./DayPage/DayBox";
import MonthBox from "./MonthPage/MonthBox";
import useSelectedTabContext from "./SelectedTab/useSelectedTabContext";
import WeekBox from "./WeekPage/WeekBox";
import YearBox from "./YearPage/YearBox";

interface Props {
  setFullMap: React.Dispatch<React.SetStateAction<boolean>>;
  fullMap: boolean;
}

const ComponentBox = ({ fullMap, setFullMap }: Props) => {
  const { selectedTab } = useSelectedTabContext();

  return (
    <div>
      {selectedTab === "DAY" && (
        <DayBox fullMap={fullMap} setFullMap={setFullMap} />
      )}
      {selectedTab === "WEEK" && <WeekBox />}
      {selectedTab === "MONTH" && <MonthBox />}
      {selectedTab === "YEAR" && <YearBox />}
    </div>
  );
};

export default ComponentBox;
