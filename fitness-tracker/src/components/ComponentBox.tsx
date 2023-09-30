import { DisplayDate } from "../entities/DisplayDate";
import { WeekDate } from "../entities/WeekDate";
import DayBox from "./DayPage/DayBox";
import WeekBox from "./WeekPage/WeekBox";

interface Props {
  selectedTab: string;
  displayDate: DisplayDate;
  displayWeekDate: WeekDate;
}

const ComponentBox = ({ selectedTab, displayDate, displayWeekDate }: Props) => {
  return (
    <div>
      {selectedTab === "DAY" && <DayBox displayDate={displayDate} />}
      {selectedTab === "WEEK" && <WeekBox displayWeekDate={displayWeekDate} />}

      {/*Week Box */}
      {/*Month Box */}
      {/*Year Box */}
    </div>
  );
};

export default ComponentBox;
