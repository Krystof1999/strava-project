import { DateTime } from "luxon";
import { DisplayDate } from "../entities/DisplayDate";
import { WeekDate } from "../entities/WeekDate";

interface Props {
  selectedTab: string;
  displayDate: DisplayDate;
  displayWeekDate: WeekDate;
}

const DateTitle = ({ selectedTab, displayDate, displayWeekDate }: Props) => {
  const parsedWeekStart = DateTime.fromFormat(
    displayWeekDate.start,
    "dd.MM.yyyy"
  );
  const weekStart = parsedWeekStart.toFormat("dd.MM.");

  const parsedWeekEnd = DateTime.fromFormat(displayWeekDate.end, "dd.MM.yyyy");
  const weekEnd = parsedWeekEnd.toFormat("dd.MM.");

  return (
    <div className="w-[140px] flex justify-center activity-font font-medium">
      {selectedTab === "DAY" &&
        `${displayDate.day}.${displayDate.month}.${displayDate.year}`}
      {selectedTab === "WEEK" && `${weekStart} - ${weekEnd}`}
    </div>
  );
};

export default DateTitle;
