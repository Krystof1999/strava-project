import { DateTime } from "luxon";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { WeekDate } from "../entities/WeekDate";
import DateTitle from "./DateTitle";
import { DisplayDayDate } from "../entities/DisplayDate";
interface Props {
  selectedTab: string;
  displayDayDate: DisplayDayDate;
  setDisplayDayDate: React.Dispatch<React.SetStateAction<DisplayDayDate>>;
  displayWeekDate: WeekDate;
  setDisplayWeekDate: React.Dispatch<React.SetStateAction<WeekDate>>;
}

const ArrowComponent = ({
  selectedTab,
  displayDayDate,
  setDisplayDayDate,
  displayWeekDate,
  setDisplayWeekDate,
}: Props) => {
  const handlePrev = () => {
    if (selectedTab === "DAY") {
      if (displayDayDate.day === 1) {
        setDisplayDayDate((prevDate: DisplayDayDate) => {
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
          } as DisplayDayDate;
        });
      } else {
        setDisplayDayDate({ ...displayDayDate, day: displayDayDate.day - 1 });
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
        day: displayDayDate.day,
        month: displayDayDate.month,
        year: displayDayDate.year,
      });

      const lastDayOfCurrentMonth = currentDateTime.endOf("month");

      if (currentDateTime.day === lastDayOfCurrentMonth.day) {
        // Transition to the next month and handle year change if necessary
        setDisplayDayDate((prevDate: DisplayDayDate) => {
          const nextMonth = prevDate.month === 12 ? 1 : prevDate.month + 1;
          const nextYear =
            prevDate.month === 12 ? prevDate.year + 1 : prevDate.year;

          return {
            ...prevDate,
            day: 1,
            month: nextMonth,
            year: nextYear,
          } as DisplayDayDate;
        });
      } else {
        // Increment the day by 1
        setDisplayDayDate({ ...displayDayDate, day: displayDayDate.day + 1 });
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
          displayDayDate={displayDayDate}
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
