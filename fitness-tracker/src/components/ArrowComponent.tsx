import { DateTime } from "luxon";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { DisplayDate } from "../entities/DisplayDate";
interface Props {
  selectedTab: string;
  displayDate: DisplayDate;
  setDisplayDate: React.Dispatch<React.SetStateAction<DisplayDate>>;
}

const ArrowComponent = ({
  selectedTab,
  displayDate,
  setDisplayDate,
}: Props) => {
  const handlePrev = () => {
    if (selectedTab === "DEN") {
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
  };

  const handleNext = () => {
    if (selectedTab === "DEN") {
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
  };

  return (
    <div className="pt-4">
      <div className="flex justify-center items-center gap-2">
        <div onClick={handlePrev}>
          <MdKeyboardArrowLeft size={30} />
        </div>
        <div className="w-[140px] flex justify-center activity-font font-medium">
          {displayDate.day}.{displayDate.month}.{displayDate.year}
        </div>
        <div onClick={handleNext}>
          <MdKeyboardArrowRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default ArrowComponent;
