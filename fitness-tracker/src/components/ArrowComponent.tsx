import { DateTime } from "luxon";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { DisplayDayDate } from "../entities/DisplayDate";
import { MonthDate } from "../entities/MonthDate";
import { YearDate } from "../entities/YearDate";
import DateTitle from "./DateTitle";
import useDayContext from "./DayPage/useDayContext";
import useWeekContext from "./WeekPage/useWeekContext";
import { getWeeksInMonth } from "./utils/dateUtils";

interface Props {
  selectedTab: string;
  displayMonthDate: MonthDate;
  setDisplayMonthDate: React.Dispatch<React.SetStateAction<MonthDate>>;
  displayYearDate: YearDate;
  setDisplayYearDate: React.Dispatch<React.SetStateAction<YearDate>>;
}

const ArrowComponent = ({
  selectedTab,
  displayMonthDate,
  setDisplayMonthDate,
  displayYearDate,
  setDisplayYearDate,
}: Props) => {
  const { displayDayDate, setDisplayDayDate } = useDayContext();
  const { displayWeekDate, setDisplayWeekDate } = useWeekContext();

  const year_week = DateTime.fromFormat(
    displayWeekDate.start,
    "dd.MM.yyyy"
  ).year;

  //current month
  const currentMonth = parseInt(DateTime.now().toFormat("MM"));
  const currentYear = DateTime.now().year;

  const [count, setCount] = useState(currentMonth);
  const [currentYearMonthView, setCurrentYearMonthView] = useState(currentYear);

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
    if (selectedTab === "MONTH") {
      const currentMonthDate = DateTime.fromFormat(
        displayMonthDate.monthName,
        "MMMM"
      ); // luxon obj
      const previousMonthDate = currentMonthDate.minus({ months: 1 }); // luxon obj

      const newMonthName = previousMonthDate.toFormat("MMMM"); //fe. January
      const newMonth = previousMonthDate.month; // fe. 8
      let updatedYear = currentYearMonthView; // fe. 2023

      if (count === 1) {
        // set year to previous one
        updatedYear = currentYearMonthView - 1;
        setCurrentYearMonthView(updatedYear);
        setCount(12);
      } else {
        setCount(count - 1);
      }

      const weeksInMonth = getWeeksInMonth(updatedYear, newMonth);
      const start = weeksInMonth[0].start;
      const end = weeksInMonth[weeksInMonth.length - 1].end;

      setDisplayMonthDate({
        start: start,
        end: end,
        monthName: newMonthName,
        month: newMonth,
        year: updatedYear,
        weeksInMonth: weeksInMonth,
      });
    }
    if (selectedTab === "YEAR") {
      // Calculate timestamps for year view
      const prevYear = displayYearDate.year - 1;
      const luxonObj = DateTime.fromObject({ year: prevYear });

      const startTimeStampYear = Math.floor(
        luxonObj.startOf("year").toSeconds()
      );
      const endTimeStampYear = Math.floor(luxonObj.endOf("year").toSeconds());

      setDisplayYearDate({
        year: displayYearDate.year - 1,
        startTimeStamp: startTimeStampYear,
        endTimeStamp: endTimeStampYear,
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
    if (selectedTab === "MONTH") {
      const currentMonthDate = DateTime.fromFormat(
        displayMonthDate.monthName,
        "MMMM"
      ); // luxon obj

      const nextMonthDate = currentMonthDate.plus({ months: 1 }); // luxon obj

      const newMonthName = nextMonthDate.toFormat("MMMM"); //fe. January
      const newMonth = nextMonthDate.month; // fe. 8
      let updatedYear = currentYearMonthView; // fe. 2023

      if (count === 12) {
        // set year to next one
        updatedYear = currentYearMonthView + 1;
        setCurrentYearMonthView(updatedYear);
        setCount(1);
      } else {
        setCount(count + 1);
      }

      const weeksInMonth = getWeeksInMonth(updatedYear, newMonth);
      const start = weeksInMonth[0].start;
      const end = weeksInMonth[weeksInMonth.length - 1].end;

      setDisplayMonthDate({
        start: start,
        end: end,
        monthName: newMonthName,
        month: newMonth,
        year: updatedYear,
        weeksInMonth: weeksInMonth,
      });
    }
    if (selectedTab === "YEAR") {
      // Calculate timestamps for year view
      const nextYear = displayYearDate.year + 1;
      const luxonObj = DateTime.fromObject({ year: nextYear });

      const startTimeStampYear = Math.floor(
        luxonObj.startOf("year").toSeconds()
      );
      const endTimeStampYear = Math.floor(luxonObj.endOf("year").toSeconds());

      setDisplayYearDate({
        year: displayYearDate.year + 1,
        startTimeStamp: startTimeStampYear,
        endTimeStamp: endTimeStampYear,
      });
    }
  };

  return (
    <div className="pt-4">
      {selectedTab === "WEEK" && (
        <div className=" text-center activity-font font-medium">
          {year_week}
        </div>
      )}
      <div className="flex justify-center items-center gap-2">
        <div onClick={handlePrev}>
          <MdKeyboardArrowLeft size={30} />
        </div>
        <DateTitle
          selectedTab={selectedTab}
          displayDayDate={displayDayDate}
          displayWeekDate={displayWeekDate}
          displayMonthDate={displayMonthDate}
          displayYearDate={displayYearDate}
        />
        <div onClick={handleNext}>
          <MdKeyboardArrowRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default ArrowComponent;
