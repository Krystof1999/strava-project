import { DateTime } from "luxon";
import { MonthDate } from "../../entities/MonthDate";
import useStravaActivities from "../../hooks/useStravaActivities";
import LazyIcon from "../LazyIcon";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";
import { getWeeksInMonth } from "../utils/dateUtils";
import YearBoxSkeleton from "./YearBoxSkeleton";
import useYearContext from "./useYearContext";

interface Props {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setDisplayMonthDate: React.Dispatch<React.SetStateAction<MonthDate>>;
}

const YearBox = ({ setSelectedTab, setDisplayMonthDate }: Props) => {
  const { displayYearDate } = useYearContext();

  const {
    data: yearActivities,
    isLoading,
    error,
  } = useStravaActivities(
    displayYearDate.startTimeStamp,
    displayYearDate.endTimeStamp
  );

  const monthsInYear = [
    { number: 1, name: "Leden", engName: "January" },
    { number: 2, name: "Únor", engName: "February" },
    { number: 3, name: "Březen", engName: "March" },
    { number: 4, name: "Duben", engName: "April" },
    { number: 5, name: "Květen", engName: "May" },
    { number: 6, name: "Červen", engName: "June" },
    { number: 7, name: "Červenec", engName: "July" },
    { number: 8, name: "Srpen", engName: "August" },
    { number: 9, name: "Září", engName: "September" },
    { number: 10, name: "Říjen", engName: "October" },
    { number: 11, name: "Listopad", engName: "November" },
    { number: 12, name: "Prosinec", engName: "December" },
  ];

  const sumOfkmPerYear = getActivityDistanceSum(yearActivities);

  const calculateDistancesPerMonth = () => {
    return monthsInYear.map((month) => {
      // Initialize sum for each month to 0
      let sum = 0;

      // Calculate the sum for the current month
      yearActivities?.forEach((activity) => {
        const startDate = DateTime.fromISO(activity.start_date);
        const monthKey = monthsInYear[startDate.month - 1]; // Adjust for 0-based month index; fe: monthsInYear[0] -> Leden
        if (monthKey === month) {
          sum += activity.distance;
        }
      });

      return {
        month,
        sum: (sum / 1000).toFixed(0),
      };
    });
  };

  const monthlySumArray = calculateDistancesPerMonth();

  const handleClick = (month: {
    name: string;
    number: number;
    engName: string;
  }) => {
    setSelectedTab("MONTH");

    const weeksInMonth = getWeeksInMonth(displayYearDate.year, month.number);
    const start = weeksInMonth[0].start;
    const end = weeksInMonth[weeksInMonth.length - 1].end;

    const displayMonthData: MonthDate = {
      start: start,
      end: end,
      monthName: month.engName,
      month: month.number,
      year: displayYearDate.year,
      weeksInMonth: weeksInMonth,
    };

    setDisplayMonthDate(displayMonthData);
  };

  if (isLoading) return <YearBoxSkeleton />;
  if (error) return <LazyIcon />;

  return (
    <>
      <div className="mt-4">
        <SumDistance sumsOfKm={sumOfkmPerYear} />
      </div>
      {monthlySumArray.map((month) => (
        <div
          className={`my-2 mx-10 py-3 h-[56px] border border-1 rounded-md flex justify-between pl-2 pr-2 activity-font ${
            month.sum === "0"
              ? "border-gray-100 text-gray-200"
              : "border-gray-300 "
          }`}
          key={month.month.name}
          onClick={() => handleClick(month.month)}
        >
          <h1>{month.month.name}</h1>
          {month.sum === "0" ? (
            <h1 className="text-gray-200">
              {month.sum} <span className="text-gray-200">km</span>
            </h1>
          ) : (
            <h1 className="text-[#F68C29]">
              {month.sum} <span className="text-black">km</span>
            </h1>
          )}
        </div>
      ))}
    </>
  );
};

export default YearBox;
