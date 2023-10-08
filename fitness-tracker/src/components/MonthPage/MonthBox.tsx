import { DateTime } from "luxon";
import { MonthDate } from "../../entities/MonthDate";
import { WeekDate } from "../../entities/WeekDate";
import useStravaActivities from "../../hooks/useStravaActivities";
import LazyIcon from "../LazyIcon";
import WeekActivities from "./WeekActivities";
import { getActivityDistanceSum } from "../utils/activityUtils";
import SumDistance from "../SumDistance";
import MonthBoxSkeleton from "./MonthBoxSkeleton";
import EmptyMonthBox from "./EmptyMonthBox";

interface Props {
  displayMonthDate: MonthDate;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setDisplayWeekDate: React.Dispatch<React.SetStateAction<WeekDate>>;
}

const MonthBox = ({
  displayMonthDate,
  setSelectedTab,
  setDisplayWeekDate,
}: Props) => {
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
    const weekStartDate = DateTime.fromFormat(start, "dd.MM.yyyy");
    const weekEndDate = DateTime.fromFormat(end, "dd.MM.yyyy");

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

    // Create an array of sport types with their respective sum of distances
    const sportTypeDistances = Object.keys(sumOfDistancesBySportType).map(
      (sport_type) => ({
        sport_type,
        distance: sumOfDistancesBySportType[sport_type],
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

  const getTimestampsForWeeksInMonth = (weeks: string) => {
    const luxonObj = DateTime.fromFormat(weeks, "dd.MM.yyyy");
    return luxonObj.toSeconds();
  };

  const timeStampsForWeeksInMonth = displayMonthDate.weeksInMonth.map(
    ({ start, end }) => ({
      startTimeStamp: getTimestampsForWeeksInMonth(start),
      endTimeStamp: getTimestampsForWeeksInMonth(end),
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

  return (
    <>
      <SumDistance sumsOfKm={sumOfMonthKm} />
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
              <h1 className="flex justify-center mb-4 activity-font">
                {week.start} - {week.end}
              </h1>

              <div className="flex flex-col gap-3">
                {week.sportTypeDistances.map((activity) => (
                  <WeekActivities
                    activity={activity}
                    key={activity.sport_type}
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
