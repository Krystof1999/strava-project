import { DisplayDayDate } from "../entities/DisplayDate";
import { WeekDate } from "../entities/WeekDate";
import DayBox from "./DayPage/DayBox";
import WeekBox from "./WeekPage/WeekBox";

interface Props {
  selectedTab: string;
  displayDayDate: DisplayDayDate;
  displayWeekDate: WeekDate;
}

const ComponentBox = ({
  selectedTab,
  displayDayDate,
  displayWeekDate,
}: Props) => {
  return (
    <div>
      {selectedTab === "DAY" && <DayBox displayDayDate={displayDayDate} />}
      {selectedTab === "WEEK" && <WeekBox displayWeekDate={displayWeekDate} />}

      {/*Week Box */}
      {/*Month Box */}
      {/*Year Box */}
    </div>
  );
};

export default ComponentBox;
