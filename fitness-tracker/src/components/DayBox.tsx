import { DateTime } from "luxon";
import useStravaActivities from "../hooks/useStravaActivities";
import ActivityIcon from "./ActivityIcon";
import DayActivityProperty from "./DayActivityProperty";
import { DisplayDate } from "../entities/DisplayDate";
import LazyIcon from "./LazyIcon";

interface Props {
  displayDate: DisplayDate;
}

const DayBox = ({ displayDate }: Props) => {
  const startTimeDate = DateTime.fromObject({
    day: displayDate.day,
    month: displayDate.month,
    year: displayDate.year,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const endTimeDate = DateTime.fromObject({
    day: displayDate.day,
    month: displayDate.month,
    year: displayDate.year,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  }).setZone("utc");

  const startTimeStamp = Math.floor(startTimeDate.toSeconds());
  const endTimeStamp = Math.floor(endTimeDate.toSeconds());

  const {
    data: activities,
    isLoading,
    error,
  } = useStravaActivities(startTimeStamp, endTimeStamp);

  //? Calculate the sum of the kilometers per day
  const activityDistances = activities?.map((a) => a.distance);
  const sumOfActivityDistances = activityDistances?.reduce(
    (prevValue, currentValue) => prevValue + currentValue,
    0
  );
  const sumOfKmPerDay = (sumOfActivityDistances! / 1000).toFixed(0);

  if (isLoading) return <p>Loading...</p>; //todo - replace with spinner or skeleton
  if (error) return <p>{error.message}</p>;
  if (activities.length === 0) return <LazyIcon />;

  return (
    <>
      <h1 className="activity-font flex justify-center mt-4">
        Celkem:<span className="text-[#F68C29] mx-1">{sumOfKmPerDay}</span>km
      </h1>

      {activities?.map((activity) => (
        <div
          className=" my-5 mx-10 border border-1 border-gray-300 rounded-md p-2 activity-font"
          key={activity.name}
        >
          <div className="flex items-center ">
            <ActivityIcon activity={activity} />
            <div className="ml-[20px] ">
              <h1 className=" text-[15px] font-medium">{activity.name}</h1>
            </div>
          </div>
          <div className="mt-10 pl-5">
            <DayActivityProperty activity={activity} />
          </div>
        </div>
      ))}
    </>
  );
};

export default DayBox;
