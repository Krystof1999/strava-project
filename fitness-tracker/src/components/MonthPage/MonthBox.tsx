import { DateTime } from "luxon";
import { MonthDate } from "../../entities/MonthDate";
import { WeekDate } from "../../entities/WeekDate";
import useStravaActivities from "../../hooks/useStravaActivities";
import LazyIcon from "../LazyIcon";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";
import GroupedActivities from "./GroupedActivities";

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

  const {
    data: activities,
    isLoading,
    error,
  } = useStravaActivities(startTimeStamp, endTimeStamp);

  const sumOfKm = getActivityDistanceSum(activities);

  if (isLoading) return "";
  if (error) return "";
  if (activities.length === 0) return <LazyIcon />;

  return (
    <>
      <SumDistance sumsOfKm={sumOfKm} />
      <div className="grid grid-cols-2 my-5 mx-10 gap-4">
        {weekDatesWithouYear.map((week, idx) => (
          <div
            className="border border-1 border-gray-300 rounded-md p-2 activity-font"
            key={week.start}
            onClick={() => handleClick(week.start, week.end, idx)}
          >
            <h1 className="flex justify-center mb-4 activity-font">
              {week.start} - {week.end}
            </h1>

            <div className="flex flex-col gap-3">
              <GroupedActivities
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
