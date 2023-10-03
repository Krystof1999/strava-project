import { LuBike } from "react-icons/lu";
import { MonthDate } from "../../entities/MonthDate";
import { DateTime } from "luxon";
import useStravaActivities from "../../hooks/useStravaActivities";
import LazyIcon from "../LazyIcon";
import SumDistance from "../SumDistance";

interface Props {
  displayMonthDate: MonthDate;
}

const MonthBox = ({ displayMonthDate }: Props) => {
  // Parse the date string using Luxon
  // const luxonOvjStart = DateTime.fromFormat(
  //   displayMonthDate.start,
  //   "dd.MM.yyyy"
  // );
  // const luxonOvjEnd = DateTime.fromFormat(displayMonthDate.end, "dd.MM.yyyy");
  // const startOfTheWeek = `${luxonOvjStart.day}.${luxonOvjStart.month}.`;
  // const endOfTheWeek = `${luxonOvjEnd.day}.${luxonOvjEnd.month}.`;

  /*
  {week
  <MonthBoxWeek />
  }
  

   <MonthBoxWeek />...
   {

   }
  */

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
  } = useStravaActivities(startTimeStamp, endTimeStamp); //TODO - make in only on one month? from 1 to 31

  if (isLoading) return <p>loading...</p>; // todo -sceleton
  if (error) return <p>{error.message}</p>;
  if (activities.length === 0) return <LazyIcon />;

  return (
    <>
      <SumDistance sumsOfKm="3" />
      <div className="grid grid-cols-2 my-5 mx-10 gap-4">
        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          {/* <h1 className="flex justify-center pb-4">{`${startOfTheWeek} - ${endOfTheWeek}`}</h1> */}
          <h1>28.8. - 3.9.</h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="border border-1 border-[#F68C29] rounded-md p-1">
                <LuBike size={30} />
              </div>
              <div>
                <p>100km</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="border border-1 border-[#F68C29] rounded-md p-1">
                <LuBike size={30} />
              </div>
              <div>
                <p>44km</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthBox;
