import { DateTime } from "luxon";
import { WeekDate } from "../entities/WeekDate";
import { DisplayDayDate } from "../entities/DisplayDate";

interface Props {
  selectedTab: string;
  displayDayDate: DisplayDayDate;
  displayWeekDate: WeekDate;
}

const DateTitle = ({ selectedTab, displayDayDate, displayWeekDate }: Props) => {
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
        `${displayDayDate.day}.${displayDayDate.month}.${displayDayDate.year}`}
      {selectedTab === "WEEK" && `${weekStart} - ${weekEnd}`}
    </div>
  );
};

export default DateTitle;
