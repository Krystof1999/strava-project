import { LuBike } from "react-icons/lu";
import { MonthDate } from "../../entities/MonthDate";
import { DateTime } from "luxon";
import useStravaActivities from "../../hooks/useStravaActivities";
import LazyIcon from "../LazyIcon";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";

interface Props {
  displayMonthDate: MonthDate;
}

const MonthBox = ({ displayMonthDate }: Props) => {
  const getWeekDatesWithoutYear = (weeks: string) => {
    const luxonObj = DateTime.fromFormat(weeks, "dd.MM.yyyy");
    return `${luxonObj.day}.${luxonObj.month}`;
  };

  const weekDatesWithouYear: { start: string; end: string }[] =
    displayMonthDate.weeksInMonth.map(({ start, end }) => ({
      start: getWeekDatesWithoutYear(start),
      end: getWeekDatesWithoutYear(end),
    }));

  /*
  {week
  <MonthBoxWeek />
  }
  

   <MonthBoxWeek />...
   {

   }
  */

  const currentMonthDate = DateTime.fromFormat(
    displayMonthDate.monthName,
    "MMMM"
  ); // luxon obj

  const startTimeStamp = Math.floor(
    currentMonthDate.startOf("month").toSeconds()
  );
  const endTimeStamp = Math.floor(currentMonthDate.endOf("month").toSeconds());

  const {
    data: activities,
    isLoading,
    error,
  } = useStravaActivities(startTimeStamp, endTimeStamp);

  const sumOfKm = getActivityDistanceSum(activities);

  if (isLoading) return <p>loading...</p>; // todo -sceleton
  if (error) return <p>{error.message}</p>;
  if (activities.length === 0) return <LazyIcon />;

  return (
    <>
      <SumDistance sumsOfKm={sumOfKm} />
      <div className="grid grid-cols-2 my-5 mx-10 gap-4">
        {weekDatesWithouYear.map((week) => (
          <div className="border border-1 border-gray-300 rounded-md p-2 activity-font">
            <h1>
              {week.start} - {week.end}
            </h1>

            <div className="flex flex-col gap-3">
              {activities.map(
                (
                  activity //TODO
                ) => (
                  <div className="flex items-center gap-3">
                    <div className="border border-1 border-[#F68C29] rounded-md p-1">
                      <LuBike size={30} />
                    </div>
                    <div>
                      <p>{`${activity.distance} km`}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}

        {/* <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MonthBox;
