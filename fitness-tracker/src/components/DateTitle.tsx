import { DateTime } from "luxon";
import { WeekDate } from "../entities/WeekDate";
import { DisplayDayDate } from "../entities/DisplayDate";
import { MonthDate } from "../entities/MonthDate";

interface Props {
  selectedTab: string;
  displayDayDate: DisplayDayDate;
  displayWeekDate: WeekDate;
  displayMonthDate: MonthDate;
}

const DateTitle = ({
  selectedTab,
  displayDayDate,
  displayWeekDate,
  displayMonthDate,
}: Props) => {
  const parsedWeekStart = DateTime.fromFormat(
    displayWeekDate.start,
    "dd.MM.yyyy"
  );
  const weekStart = parsedWeekStart.toFormat("dd.MM.");

  const parsedWeekEnd = DateTime.fromFormat(displayWeekDate.end, "dd.MM.yyyy");
  const weekEnd = parsedWeekEnd.toFormat("dd.MM.");

  const monthNames: { [key: string]: string } = {
    January: "Leden",
    February: "Únor",
    March: "Březen",
    April: "Duben",
    May: "Květen",
    June: "Červen",
    July: "Červenec",
    August: "Srpen",
    September: "Září",
    October: "Říjen",
    November: "Listopad",
    December: "Prosinec",
  };
  const monthNameEng = displayMonthDate.monthName;
  const monthNameCZ = monthNames[monthNameEng];

  return (
    <div className="w-[140px] flex justify-center activity-font font-medium">
      {selectedTab === "DAY" &&
        `${displayDayDate.day}.${displayDayDate.month}.${displayDayDate.year}`}
      {selectedTab === "WEEK" && `${weekStart} - ${weekEnd}`}
      {selectedTab === "MONTH" && `${displayMonthDate.year} ${monthNameCZ}`}
    </div>
  );
};

export default DateTitle;
