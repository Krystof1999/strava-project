import { DisplayDayDate } from "../entities/DisplayDate";
import { WeekDate } from "../entities/WeekDate";
import DayBox from "./DayPage/DayBox";
import WeekBox from "./WeekPage/WeekBox";

interface Props {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  displayDayDate: DisplayDayDate;
  setDisplayDayDate: React.Dispatch<React.SetStateAction<DisplayDayDate>>;
  displayWeekDate: WeekDate;
}

const ComponentBox = ({
  selectedTab,
  setSelectedTab,
  displayDayDate,
  setDisplayDayDate,
  displayWeekDate,
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

      {/*Week Box */}
      {/*Month Box */}
      {/*Year Box */}
    </div>
  );
};

export default ComponentBox;
