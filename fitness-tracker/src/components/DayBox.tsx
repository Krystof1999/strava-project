import { LuBike } from "react-icons/lu";
import { DisplayDate } from "../App";
import { DateTime } from "luxon";
import useStravaActivities from "../hooks/useStravaActivities";

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
  console.log(activities?.map((a) => a.distance));

  if (isLoading) return <p>Loading...</p>; //todo - replace with spinner or skeleton
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {activities?.map((activity) => (
        <div
          className=" m-5 border border-1 border-gray-300 rounded-md p-2"
          key={activity.name}
        >
          <div className="flex items-center">
            <div className="border border-1 rounded-md p-1">
              <LuBike size={30} />
            </div>
            <div className="ml-[30px] ">
              <h1>{activity.name}</h1>
            </div>
          </div>
          <div className="mt-10 pl-5">
            <div className="flex mb-2">
              <p>Celkem:</p>
              <p>150km 110m</p>
            </div>
            <div className="flex mb-2">
              <p>Čas:</p>
              <p>12h 23min</p>
            </div>
            <div className="flex mb-2">
              <p>Výškové metry"</p>
              <p>654m</p>
            </div>
            <div className="flex mb-2">
              <p>Průměrná rychlost:</p>
              <p>14 km/h</p>
            </div>
            <div className="flex mb-2">
              <p>Maximální rychlost:</p>
              <p>38 km/h</p>
            </div>
            <div>Mapa</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DayBox;
