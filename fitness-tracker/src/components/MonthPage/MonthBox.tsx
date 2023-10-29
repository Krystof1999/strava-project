import { DateTime } from "luxon";
import useStravaActivities from "../../hooks/useStravaActivities";
import LazyIcon from "../LazyIcon";
import SumDistance from "../SumDistance";
import useWeekContext from "../WeekPage/useWeekContext";
import { getActivityDistanceSum } from "../utils/activityUtils";
import EmptyMonthBox from "./EmptyMonthBox";
import MonthBoxSkeleton from "./MonthBoxSkeleton";
import WeekActivities from "./WeekActivities";
import useMonthContext from "./useMonthContext";
import useSelectedTabContext from "../SelectedTab/useSelectedTabContext";

const MonthBox = () => {
  const { setDisplayWeekDate } = useWeekContext();
  const { displayMonthDate } = useMonthContext();
  const { setSelectedTab } = useSelectedTabContext();

  const startTimeStamp = Math.floor(
    DateTime.fromFormat(displayMonthDate.start, "dd.MM.yyyy").toSeconds()
  );
  const endTimeStamp = Math.floor(
    DateTime.fromFormat(displayMonthDate.end, "dd.MM.yyyy").toSeconds()
  );

  const {
    data: activities,
    isLoading,
    error,
  } = useStravaActivities(startTimeStamp, endTimeStamp);

  if (isLoading) return <MonthBoxSkeleton />;
  if (error)
    return (
      <div className="rounded-md flex justify-center ">
        <LazyIcon />
      </div>
    );

  const getWeekDatesWithoutYear = (weeks: string) => {
    const luxonObj = DateTime.fromFormat(weeks, "dd.MM.yyyy");
    return `${luxonObj.day}.${luxonObj.month}`;
  };

  const weekActivities = displayMonthDate.weeksInMonth.map(({ start, end }) => {
    // Convert start and end dates to Luxon DateTime objects - start and end of the week
    const weekStartDate_prep = DateTime.fromFormat(start, "dd.MM.yyyy");
    const weekEndDate_prep = DateTime.fromFormat(end, "dd.MM.yyyy");

    const weekStartDate = weekStartDate_prep.plus({ hours: 0, minutes: 0 });
    const weekEndDate = weekEndDate_prep.plus({ hours: 23, minutes: 59 });

    // Find activities within the current week
    const activitiesInWeek = activities?.filter((activity) => {
      const activityDate = DateTime.fromISO(activity.start_date);

      // Compare activity date to the start and end dates
      return activityDate >= weekStartDate && activityDate <= weekEndDate;
    });

    // Extract sport types from activities in the week
    const sportTypes = [
      ...new Set(activitiesInWeek?.map((activity) => activity.sport_type)),
    ];

    const sumOfDistancesBySportType = activitiesInWeek?.reduce(
      (acc, activity) => {
        const { sport_type, distance } = activity;

        if (!acc[sport_type]) {
          acc[sport_type] = 0;
        }

        acc[sport_type] += distance;
        return acc;
      },
      {} as { [sport_type: string]: number }
    );

    const gymTime: { [sport_type: string]: number } = activitiesInWeek.reduce(
      (acc, ac) => {
        if (ac.sport_type === "WeightTraining") {
          if (!acc[ac.sport_type]) {
            acc[ac.sport_type] = 0;
          }
          acc[ac.sport_type] += ac.moving_time;
        }
        return acc;
      },
      {} as { [sport_type: string]: number }
    );

    // Create an array of sport types with their respective sum of distances
    const sportTypeDistances = Object.keys(sumOfDistancesBySportType).map(
      (sport_type) => ({
        sport_type,
        distance: sumOfDistancesBySportType[sport_type],
        gymTime: gymTime[sport_type],
      })
    );

    return {
      start: getWeekDatesWithoutYear(start),
      end: getWeekDatesWithoutYear(end),
      activities: activitiesInWeek || [], // Assign an empty array if no activities found
      sport_type: sportTypes.join(", "), // Join multiple sport types if there are more than one
      sportTypeDistances, // Array of sport types with their respective sum of distances
    };
  });

  const getMonthActivities = (year: number, month: number) => {
    const monthStart = DateTime.fromObject({ year, month }).startOf("month");
    const monthEnd = DateTime.fromObject({ year, month }).endOf("month");

    return activities?.filter((activity) => {
      const activityDate = DateTime.fromISO(activity.start_date);

      // Compare activity date to the start and end dates
      return activityDate >= monthStart && activityDate <= monthEnd;
    });
  };

  const monthActivities = getMonthActivities(
    displayMonthDate.year,
    displayMonthDate.month
  );
  const sumOfMonthKm = getActivityDistanceSum(monthActivities);

  const getTimestampsForWeeksInMonth_Start = (weeks: string) => {
    const luxonObj = DateTime.fromFormat(weeks, "dd.MM.yyyy");
    return luxonObj.plus({ hour: 0, minute: 0 }).toSeconds();
  };

  const getTimestampsForWeeksInMonth_End = (weeks: string) => {
    const luxonObj = DateTime.fromFormat(weeks, "dd.MM.yyyy");
    return luxonObj.plus({ hour: 23, minute: 59 }).toSeconds();
  };

  const timeStampsForWeeksInMonth = displayMonthDate.weeksInMonth.map(
    ({ start, end }) => ({
      startTimeStamp: getTimestampsForWeeksInMonth_Start(start),
      endTimeStamp: getTimestampsForWeeksInMonth_End(end),
    })
  );

  const formatDateString = (dateStr: string) => {
    const luxonObj = DateTime.fromFormat(dateStr, "d.M.yyyy");
    if (luxonObj.isValid) {
      return luxonObj.toFormat("dd.MM.yyyy");
    }
    // Return the original string if it doesn't match the expected format
    return dateStr;
  };

  const handleClick = (
    startOfTheWeek: string,
    endOfTheWeek: string,
    idx: number
  ) => {
    setSelectedTab("WEEK");

    const year = DateTime.fromFormat(displayMonthDate.start, "dd.MM.yyyy").year;

    const formattedStart = formatDateString(`${startOfTheWeek}.${year}`);
    const formattedEnd = formatDateString(`${endOfTheWeek}.${year}`);

    const displayWeekData = {
      start: formattedStart,
      end: formattedEnd,
      startTimeStamp: timeStampsForWeeksInMonth[idx].startTimeStamp,
      endTimeStamp: timeStampsForWeeksInMonth[idx].endTimeStamp,
    };

    setDisplayWeekDate(displayWeekData);
  };

  const weekActivitiesDistances = weekActivities.map((week) =>
    week.sportTypeDistances.map((activity) => activity.distance)
  );

  const weekActivitiesDistancesSum = weekActivitiesDistances.map((element) => {
    return (element.reduce((acc, curr) => acc + curr, 0) / 1000).toFixed(0);
  });
  return (
    <>
      <div className="mt-4">
        <SumDistance sumsOfKm={sumOfMonthKm} />
      </div>
      <div className="grid grid-cols-2 my-5 mx-10 gap-4">
        {weekActivities.map((week, idx) =>
          week.activities.length === 0 ? (
            <EmptyMonthBox week={week} key={week.start} />
          ) : (
            <div
              className="border border-1 border-gray-300 rounded-md p-2 activity-font"
              key={week.start}
              onClick={() => handleClick(week.start, week.end, idx)}
            >
              <h1 className="flex justify-center activity-font">
                {week.start} - {week.end}
              </h1>

              <div className="mb-6 mt-2">
                <SumDistance
                  sumsOfKm={weekActivitiesDistancesSum[idx].toString()}
                  key={week.start}
                />
              </div>

              <div className="flex flex-col gap-3">
                {week.sportTypeDistances.map((weekActivity) => (
                  <WeekActivities
                    weekActivity={weekActivity}
                    key={weekActivity.sport_type}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default MonthBox;
