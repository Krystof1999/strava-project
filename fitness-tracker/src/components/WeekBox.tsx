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
    const daysOfWeek = [];

    // Define an array of day names
    const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    // Convert timestamps to Luxon DateTime objects
    let currentDate = DateTime.fromSeconds(startTimestamp);
    const endDate = DateTime.fromSeconds(endTimestamp);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toFormat("dd.MM.");
      // Get the day of the week (0 for Monday, 1 for Tuesday, etc.)
      const dayOfWeek = currentDate.weekday - 1;
      // Get the day name based on the day of the week
      const dayName = dayNames[dayOfWeek];

      // Push the date and day name as an object to the array
      daysOfWeek.push({ date: formattedDate, day: dayName });

      currentDate = currentDate.plus({ days: 1 });
    }
    return daysOfWeek;
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
      distanceByEachDay[day.date] =
        activityByEachDay[day.date]?.reduce(
          (totalDistance, activity) => totalDistance + activity.distance,
          0
        ) / 1000;
    });
    return distanceByEachDay;
  };

  const getSportTypeByEachDay = () => {
    const sportTypeByEachDay: { [date: string]: string[] } = {};

    daysInWeek.forEach((day) => {
      sportTypeByEachDay[day.date] =
        activityByEachDay[day.date]?.map((activity) => activity.sport_type) ||
        [];
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
          key={day.date}
          className={`my-2 mx-10 py-3 border border-1 border-gray-300 rounded-md flex justify-between pl-2 pr-2 activity-font
          ${
            !isNaN(distanceByEachDay[day.date])
              ? ""
              : "border-gray-100 text-gray-200 "
          }`}
        >
          <div className="flex gap-2">
            <p>{day.day}</p>
            <p>{day.date}</p>

            {sportTypeByEachDay[day.date].map((sportType, idx) => (
              <div className="pl-2" key={idx}>
                <ActivityIcon activityType={sportType} />
              </div>
            ))}
          </div>

          {!isNaN(distanceByEachDay[day.date]) ? (
            <p className=" text-[#F68C29]">
              {distanceByEachDay[day.date].toFixed(2)}
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
