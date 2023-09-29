import { DateTime } from "luxon";
import { WeekDate } from "../entities/WeekDate";
import useStravaActivities from "../hooks/useStravaActivities";
import LazyIcon from "./LazyIcon";
import { Activity } from "../entities/Activity";
import ActivityIcon from "./ActivityIcon";

interface Props {
  displayWeekDate: WeekDate;
}

const WeekBox = ({ displayWeekDate }: Props) => {
  const {
    data: activities,
    isLoading,
    error,
  } = useStravaActivities(
    displayWeekDate.startTimeStamp,
    displayWeekDate.endTimeStamp
  );

  const createDaysInWeek = () => {
    const startTimestamp = displayWeekDate.startTimeStamp; // Monday
    const endTimestamp = displayWeekDate.endTimeStamp; // Sunday
    const datesOfWeek = [];

    // Convert timestamps to Luxon DateTime objects
    let currentDate = DateTime.fromSeconds(startTimestamp);
    const endDate = DateTime.fromSeconds(endTimestamp);

    while (currentDate <= endDate) {
      // Format the date as "dd.MM." and push to the array
      const formattedDate = currentDate.toFormat("dd.MM.");
      datesOfWeek.push(formattedDate);

      // Add one day to the current date
      currentDate = currentDate.plus({ days: 1 });
    }

    return datesOfWeek;
  };
  const getActivitiesByEachDay = () => {
    const activitiesByDate: { [date: string]: Activity[] } = {};

    // Convert activities to an object where keys are "dd.MM." dates
    activities?.forEach((activity) => {
      const startDate = DateTime.fromISO(activity.start_date).toFormat(
        "dd.MM."
      );
      if (!activitiesByDate[startDate]) {
        activitiesByDate[startDate] = [];
      }
      activitiesByDate[startDate].push(activity);
    });

    return activitiesByDate;
  };
  const getActivityDistanceByEachDay = () => {
    const distanceByEachDay: { [date: string]: number } = {};
    daysInWeek.forEach((day) => {
      distanceByEachDay[day] =
        activityByEachDay[day]?.reduce(
          (totalDistance, activity) => totalDistance + activity.distance,
          0
        ) / 1000;
    });
    return distanceByEachDay;
  };

  const getSportTypeByEachDay = () => {
    const sportTypeByEachDay: { [date: string]: string[] } = {};

    daysInWeek.forEach((day) => {
      sportTypeByEachDay[day] =
        activityByEachDay[day]?.map((activity) => activity.sport_type) || [];
    });

    return sportTypeByEachDay;
  };

  const getActivityDistanceSum = () => {
    //* Calculate the sum of the kilometers per day
    const activityDistances = activities?.map((a) => a.distance);
    const sumOfActivityDistances = activityDistances?.reduce(
      (prevValue, currentValue) => prevValue + currentValue,
      0
    );
    return (sumOfActivityDistances! / 1000).toFixed(0);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="rounded-md flex justify-center ">
        <LazyIcon />
      </div>
    );
  if (activities.length === 0) return <LazyIcon />;

  const sumOfKmPerDay = getActivityDistanceSum();
  const daysInWeek = createDaysInWeek();
  const activityByEachDay = getActivitiesByEachDay();
  const distanceByEachDay = getActivityDistanceByEachDay();

  const sportTypeByEachDay = getSportTypeByEachDay();

  return (
    <>
      <h1 className="activity-font flex justify-center mt-4 mb-5">
        Celkem:<span className="text-[#F68C29] mx-1">{sumOfKmPerDay}</span>km
      </h1>

      {daysInWeek.map((day) => (
        <div
          key={day}
          className={`my-2 mx-10 py-3 border border-1 border-gray-300 rounded-md flex justify-between pl-2 pr-2 activity-font
          ${
            !isNaN(distanceByEachDay[day])
              ? ""
              : "border-gray-100 text-gray-200 "
          }`}
        >
          <div className="flex gap-2">
            <p className="">{day}</p>

            {sportTypeByEachDay[day].map((sportType, idx) => (
              <div className="pl-2" key={idx}>
                <ActivityIcon activityType={sportType} />
              </div>
            ))}
          </div>

          {!isNaN(distanceByEachDay[day]) ? (
            <p className=" text-[#F68C29]">
              {distanceByEachDay[day].toFixed(2)}
              <span className="text-black"> km</span>
            </p>
          ) : (
            <p>
              0<span className="text-gray-200"> km</span>
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default WeekBox;
