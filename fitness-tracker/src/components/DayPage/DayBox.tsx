import { DateTime } from "luxon";
import useStravaActivities from "../../hooks/useStravaActivities";
import ActivityIcon from "../ActivityIcon";
import DayActivityProperty from "./DayActivityProperty";
import LazyIcon from "../LazyIcon";
import DayBoxSkeleton from "./DayBoxSkeleton";
import { DisplayDayDate } from "../../entities/DisplayDate";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";
import Map from "../Map";
import polyline from "@mapbox/polyline";
import { LatLngExpression } from "leaflet";

interface Props {
  displayDayDate: DisplayDayDate;
}

const DayBox = ({ displayDayDate }: Props) => {
  const startTimeDate = DateTime.fromObject({
    day: displayDayDate.day,
    month: displayDayDate.month,
    year: displayDayDate.year,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const endTimeDate = DateTime.fromObject({
    day: displayDayDate.day,
    month: displayDayDate.month,
    year: displayDayDate.year,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });

  const startTimeStamp = Math.floor(startTimeDate.toSeconds());
  const endTimeStamp = Math.floor(endTimeDate.toSeconds());

  const {
    data: activities,
    isLoading,
    error,
  } = useStravaActivities(startTimeStamp, endTimeStamp);

  const sumOfKmPerDay = getActivityDistanceSum(activities);

  if (isLoading) return <DayBoxSkeleton />;
  if (error) return <p>{error.message}</p>;
  if (activities.length === 0) return <LazyIcon />;

  const mapPolylines: LatLngExpression[][] = [];
  for (let i = 0; i < activities!.length; i += 1) {
    const activity_polyline = activities?.map((a) => a.map.summary_polyline)[i];

    const decodedMapPolyline = polyline.decode(
      activity_polyline
    ) as LatLngExpression[];

    mapPolylines.push(decodedMapPolyline);
  }
  console.log(mapPolylines);

  return (
    <>
      <div className="mt-4">
        <SumDistance sumsOfKm={sumOfKmPerDay} />
      </div>
      {activities?.map((activity) => (
        <div
          className=" my-5 mx-10 border border-1 border-gray-300 rounded-md p-2 activity-font"
          key={activity.name}
        >
          <div className="flex items-center ">
            <ActivityIcon activity={activity} />
            <div className="ml-[20px] ">
              <h1 className=" text-[15px] font-medium">{activity.name}</h1>
            </div>
          </div>
          <div className="mt-10 pl-5">
            <DayActivityProperty activity={activity} />
          </div>
          <Map
            coordinates={{ lat: 50.1039, lng: 14.43564 }}
            mapPolylines={mapPolylines}
          />
        </div>
      ))}
    </>
  );
};

export default DayBox;
