import { DateTime } from "luxon";
import { YearDate } from "../../entities/YearDate";
import useStravaActivities from "../../hooks/useStravaActivities";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";

interface Props {
  displayYearDate: YearDate;
}

const YearBox = ({ displayYearDate }: Props) => {
  const { data: yearActivities } = useStravaActivities(
    displayYearDate.startTimeStamp,
    displayYearDate.endTimeStamp
  );
  const monthsInYear = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ];

  const sumOfkmPerYear = getActivityDistanceSum(yearActivities);

  const monthlySumArray = monthsInYear.map((month) => {
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

  return (
    <>
      <SumDistance sumsOfKm={sumOfkmPerYear} />
      {monthlySumArray.map((month) => (
        <div
          className={`my-2 mx-10 py-3 border border-1 rounded-md flex justify-between pl-2 pr-2 activity-font ${
            month.sum === "0"
              ? "border-gray-100 text-gray-200"
              : "border-gray-300 "
          }`}
          key={month.month}
        >
          <h1>{month.month}</h1>
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

{
  /* <SumDistance sumsOfKm={sumOfKmPerWeek} />

{daysInWeek.map((day) => ( 
  <div
    onClick={() => handleDayClick(day.date)}
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
        <div key={idx}>
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
))} */
}
