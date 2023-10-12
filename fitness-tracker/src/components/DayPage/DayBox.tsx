import polyline from "@mapbox/polyline";
import { LatLngExpression } from "leaflet";
import { DateTime } from "luxon";
import { DisplayDayDate } from "../../entities/DisplayDate";
import useStravaActivities from "../../hooks/useStravaActivities";
import ActivityIcon from "../ActivityIcon";
import LazyIcon from "../LazyIcon";
import Map, { coordinatesType } from "../Map";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";
import DayActivityProperty from "./DayActivityProperty";
import DayBoxSkeleton from "./DayBoxSkeleton";

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

  const mapPolylines: LatLngExpression[][] = activities.map((activity) => {
    const activity_polyline = activity.map.summary_polyline;
    const decodedMapPolyline = polyline.decode(
      activity_polyline
    ) as LatLngExpression[];
    return decodedMapPolyline;
  });

  // Calculate the center of the polyline coordinates
  function calculateCenterOfTheMapView(
    mapPolylines: LatLngExpression[][]
  ): coordinatesType[] {
    return mapPolylines.map((polyline) => {
      const latitudes = polyline.map((point) => (point as number[])[0]);
      const longitudes = polyline.map((point) => (point as number[])[1]);

      const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
      const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

      return {
        lat: isNaN(centerLat) ? 0 : centerLat,
        lng: isNaN(centerLng) ? 0 : centerLng,
      };
    });
  }

  const centerMapView = calculateCenterOfTheMapView(mapPolylines);

  return (
    <>
      <div className="mt-4">
        <SumDistance sumsOfKm={sumOfKmPerDay} />
      </div>
      {activities?.map((activity, idx) => (
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
          {centerMapView[idx].lat !== 0 || centerMapView[idx].lng !== 0 ? (
            <Map
              coordinates={{
                lat: centerMapView[idx].lat,
                lng: centerMapView[idx].lng,
              }}
              mapPolylines={mapPolylines}
            />
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};

export default DayBox;
