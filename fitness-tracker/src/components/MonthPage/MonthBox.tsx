import { MonthDate } from "../../entities/MonthDate";
import { DateTime } from "luxon";
import useStravaActivities from "../../hooks/useStravaActivities";
import LazyIcon from "../LazyIcon";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";
import TestComponent from "../TestComponent";

interface Props {
  displayMonthDate: MonthDate;
}

const MonthBox = ({ displayMonthDate }: Props) => {
  const getWeekDatesWithoutYear = (weeks: string) => {
    const luxonObj = DateTime.fromFormat(weeks, "dd.MM.yyyy");
    return `${luxonObj.day}.${luxonObj.month}`;
  };

  const getTimestampsForWeeksInMonth = (weeks: string) => {
    const luxonObj = DateTime.fromFormat(weeks, "dd.MM.yyyy");
    return luxonObj.toSeconds();
  };

  const weekDatesWithouYear: { start: string; end: string }[] =
    displayMonthDate.weeksInMonth.map(({ start, end }) => ({
      start: getWeekDatesWithoutYear(start),
      end: getWeekDatesWithoutYear(end),
    }));

  const timeStampsForWeeksInMonth = displayMonthDate.weeksInMonth.map(
    ({ start, end }) => ({
      startTimeStamp: getTimestampsForWeeksInMonth(start),
      endTimeStamp: getTimestampsForWeeksInMonth(end),
    })
  );

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
        {weekDatesWithouYear.map((week, idx) => (
          <div className="border border-1 border-gray-300 rounded-md p-2 activity-font">
            <h1>
              {week.start} - {week.end}
            </h1>

            <div className="flex flex-col gap-3">
              <TestComponent // todo -rename
                startTimeStamp={timeStampsForWeeksInMonth[idx].startTimeStamp}
                endTimeStamp={timeStampsForWeeksInMonth[idx].endTimeStamp}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MonthBox;
