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

  return (
    <div className="pt-4">
      <div className="flex justify-center items-center gap-2">
        <div onClick={handlePrev}>
          <MdKeyboardArrowLeft size={30} />
        </div>
        <div className="w-[140px] flex justify-center activity-font font-medium">
          {displayDate.day}.{displayDate.month}.{displayDate.year}
        </div>
        <div>
          <MdKeyboardArrowRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default ArrowComponent;
