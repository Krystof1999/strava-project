import { DateTime } from "luxon";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useStravaActivities from "../hooks/useStravaActivities";
interface Props {
  selectedTab: string;
}

interface Date {
  day: number;
  month: number;
  year: number;
}

const ArrowComponent = ({ selectedTab }: Props) => {
  const dateNow = DateTime.now();

  const startDay = dateNow.day;
  const startMonth = dateNow.month;
  const startYear = dateNow.year;

  const [date, setDate] = useState<Date>({
    day: startDay,
    month: startMonth,
    year: startYear,
  });

  const startTimeDate = DateTime.fromObject({
    day: date.day,
    month: date.month,
    year: date.year,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const endTimeDate = DateTime.fromObject({
    day: date.day,
    month: date.month,
    year: date.year,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  }).setZone("utc");

  const startTimeStamp = Math.floor(startTimeDate.toSeconds());
  const endTimeStamp = Math.floor(endTimeDate.toSeconds());

  const { data } = useStravaActivities(startTimeStamp, endTimeStamp);
  console.log(data);

  const handlePrev = () => {
    if (selectedTab === "DEN") {
      setDate({ ...date, day: date.day - 1 });
    }
  };

  return (
    <div className="pt-4">
      <div className="flex justify-center items-center gap-2">
        <div onClick={handlePrev}>
          <MdKeyboardArrowLeft size={30} />
        </div>
        <div className="w-[140px] flex justify-center">zari 2023</div>
        <div>
          <MdKeyboardArrowRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default ArrowComponent;
