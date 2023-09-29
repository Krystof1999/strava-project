import { DateTime } from "luxon";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { DisplayDate } from "../entities/DisplayDate";
import { WeekDate } from "../entities/WeekDate";
import DateTitle from "./DateTitle";
interface Props {
  selectedTab: string;
  displayDate: DisplayDate;
  setDisplayDate: React.Dispatch<React.SetStateAction<DisplayDate>>;
  displayWeekDate: WeekDate;
  setDisplayWeekDate: React.Dispatch<React.SetStateAction<WeekDate>>;
}

const ArrowComponent = ({
  selectedTab,
  displayDate,
  setDisplayDate,
  displayWeekDate,
  setDisplayWeekDate,
}: Props) => {
  const handlePrev = () => {
    if (selectedTab === "DAY") {
      if (displayDate.day === 1) {
        setDisplayDate((prevDate: DisplayDate) => {
          const prevMonth = prevDate.month === 1 ? 12 : prevDate.month - 1;
          const prevYear =
            prevDate.month === 1 && prevDate.day === 1
              ? prevDate.year - 1
              : prevDate.year;
          const lastDayOfPrevMonth = DateTime.local(
            // find the last day in month
            prevYear,
            prevMonth
          ).daysInMonth;
          return {
            ...prevDate,
            day: lastDayOfPrevMonth,
            month: prevMonth,
            year: prevYear,
          } as DisplayDate;
        });
      } else {
        setDisplayDate({ ...displayDate, day: displayDate.day - 1 });
      }
    }
    if (selectedTab === "WEEK") {
      const currentWeekStart = DateTime.fromFormat(
        displayWeekDate.start,
        "dd.MM.yyyy"
      );

      // Calculate the start date of the previous week (last Monday)
      const previousWeekStart = currentWeekStart.minus({ weeks: 1 });

      // Calculate the end date of the previous week (last Sunday)
      const previousWeekEnd = previousWeekStart.plus({ days: 6 });

      const formattedPrevStart = previousWeekStart.toFormat("dd.MM.yyyy"); // Include the year
      const formattedPrevEnd = previousWeekEnd.toFormat("dd.MM.yyyy"); // Include the year

      // Calculate timestamps for the previous week
      const startTimeStamp = previousWeekStart.toSeconds();
      const endTimeStamp = previousWeekEnd.toSeconds();

      setDisplayWeekDate({
        start: formattedPrevStart,
        end: formattedPrevEnd,
        startTimeStamp: startTimeStamp,
        endTimeStamp: endTimeStamp,
      });
    }
  };

  const handleNext = () => {
    if (selectedTab === "DAY") {
      const currentDateTime = DateTime.fromObject({
        day: displayDate.day,
        month: displayDate.month,
        year: displayDate.year,
      });

      const lastDayOfCurrentMonth = currentDateTime.endOf("month");

      if (currentDateTime.day === lastDayOfCurrentMonth.day) {
        // Transition to the next month and handle year change if necessary
        setDisplayDate((prevDate: DisplayDate) => {
          const nextMonth = prevDate.month === 12 ? 1 : prevDate.month + 1;
          const nextYear =
            prevDate.month === 12 ? prevDate.year + 1 : prevDate.year;

          return {
            ...prevDate,
            day: 1,
            month: nextMonth,
            year: nextYear,
          } as DisplayDate;
        });
      } else {
        // Increment the day by 1
        setDisplayDate({ ...displayDate, day: displayDate.day + 1 });
      }
    }
    if (selectedTab === "WEEK") {
      const currentWeekStart = DateTime.fromFormat(
        displayWeekDate.start,
        "dd.MM.yyyy"
      );

      // Calculate the start date of the next week (next Monday)
      const nextWeekStart = currentWeekStart.plus({ weeks: 1 });

      // Calculate the end date of the next week (next Sunday)
      const nextWeekEnd = nextWeekStart.endOf("week");

      const formattedNextStart = nextWeekStart.toFormat("dd.MM.yyyy");
      const formattedNextEnd = nextWeekEnd.toFormat("dd.MM.yyyy");

      // Calculate timestamps for the next week
      const startTimeStamp = Math.floor(nextWeekStart.toSeconds());
      const endTimeStamp = Math.floor(nextWeekEnd.toSeconds());

      setDisplayWeekDate({
        start: formattedNextStart,
        end: formattedNextEnd,
        startTimeStamp: startTimeStamp,
        endTimeStamp: endTimeStamp,
      });
    }
  };
  const year = DateTime.fromFormat(displayWeekDate.start, "dd.MM.yyyy").year;

  return (
    <div className="pt-4">
      {selectedTab === "WEEK" && (
        <div className=" text-center activity-font font-medium">{year}</div>
      )}
      <div className="flex justify-center items-center gap-2">
        <div onClick={handlePrev}>
          <MdKeyboardArrowLeft size={30} />
        </div>
        <DateTitle
          selectedTab={selectedTab}
          displayDate={displayDate}
          displayWeekDate={displayWeekDate}
        />
        <div onClick={handleNext}>
          <MdKeyboardArrowRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default ArrowComponent;
