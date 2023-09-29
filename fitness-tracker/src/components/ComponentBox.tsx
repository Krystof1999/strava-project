import { DisplayDate } from "../entities/DisplayDate";
import { WeekDate } from "../entities/WeekDate";
import DayBox from "./DayBox";
import WeekBox from "./WeekBox";

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
