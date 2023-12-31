import { DateTime } from "luxon";
import { Activity } from "../../entities/Activity";
import useStravaActivities from "../../hooks/useStravaActivities";
import ActivityIcon from "../ActivityIcon";
import useDayContext from "../DayPage/useDayContext";
import LazyIcon from "../LazyIcon";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";
import WeekBoxSkeleton from "./WeekBoxSkeleton";
import useWeekContext from "./useWeekContext";
import useSelectedTabContext from "../SelectedTab/useSelectedTabContext";
import WeekBoxDetail from "./WeekBoxDetail";

const WeekBox = () => {
  const { setDisplayDayDate } = useDayContext();
  const { displayWeekDate } = useWeekContext();
  const { setSelectedTab } = useSelectedTabContext();

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
    let currentDate = DateTime.fromSeconds(startTimestamp!);
    const endDate = DateTime.fromSeconds(endTimestamp!);

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
    const distanceByEachDay: {
      [date: string]: { distance: number; moving_time: number };
    } = {};

    daysInWeek.forEach((day) => {
      if (!distanceByEachDay[day.date]) {
        distanceByEachDay[day.date] = { distance: 0, moving_time: 0 };
      }
      distanceByEachDay[day.date].distance =
        (activityByEachDay[day.date] || []).reduce(
          (totalDistance, activity) => totalDistance + activity.distance,
          0
        ) / 1000;

      distanceByEachDay[day.date].moving_time = (
        activityByEachDay[day.date] || []
      ).reduce((totalTime, activity) => totalTime + activity.moving_time, 0);
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

  const handleDayClick = (dayDate: string) => {
    setSelectedTab("DAY");

    const year = DateTime.fromFormat(displayWeekDate.start, "dd.MM.yyyy").year;
    const luxonDate = DateTime.fromFormat(`${dayDate}${year}`, "dd.MM.yyyy");

    const day = luxonDate.day;
    const month = luxonDate.month;

    const displayDayData = {
      day: day,
      month: month,
      year: year,
    };
    setDisplayDayDate(displayDayData);
  };

  if (isLoading)
    return (
      <>
        <WeekBoxSkeleton />
      </>
    );
  if (error)
    return (
      <div className="rounded-md flex justify-center ">
        <LazyIcon />
      </div>
    );
  if (activities.length === 0) return <LazyIcon />;

  const sumOfKmPerWeek = getActivityDistanceSum(activities);
  const daysInWeek = createDaysInWeek();
  const activityByEachDay = getActivitiesByEachDay();
  const distanceByEachDay = getActivityDistanceByEachDay();
  const sportTypeByEachDay = getSportTypeByEachDay();

  return (
    <>
      <div className="mt-4">
        <SumDistance sumsOfKm={sumOfKmPerWeek} />
      </div>
      {daysInWeek.map((day) => (
        <div
          onClick={() => handleDayClick(day.date)}
          key={day.date}
          className={`my-2 mx-10 py-3 border border-1 border-gray-300 rounded-md flex justify-between pl-2 pr-2 activity-font
        ${
          distanceByEachDay[day.date]?.distance > 0
            ? ""
            : distanceByEachDay[day.date]?.moving_time > 0
            ? ""
            : '"border-gray-100 text-gray-200 h-[56px]"'
        }`}
        >
          <div className="flex gap-2 items-center">
            <p>{day.day}</p>
            <p>{day.date}</p>

            {sportTypeByEachDay[day.date]?.map((sportType, idx) => (
              <div key={idx}>
                <ActivityIcon activityType={sportType} />
              </div>
            ))}
          </div>

          <WeekBoxDetail distanceByEachDay={distanceByEachDay} day={day} />
        </div>
      ))}
    </>
  );
};

export default WeekBox;
