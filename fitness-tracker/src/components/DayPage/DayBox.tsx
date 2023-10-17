import { LatLngExpression } from "leaflet";
import { DateTime } from "luxon";
import { useState } from "react";
import useStravaActivities from "../../hooks/useStravaActivities";
import ActivityIcon from "../ActivityIcon";
import LazyIcon from "../LazyIcon";
import FullMap from "../Map/FullMap";
import Map, { coordinatesType } from "../Map/Map";
import SumDistance from "../SumDistance";
import { getActivityDistanceSum } from "../utils/activityUtils";
import {
  calculateCenterOfTheMapView,
  getMapPolylines,
} from "../utils/mapUtils";
import DayActivityProperty from "./DayActivityProperty";
import DayBoxSkeleton from "./DayBoxSkeleton";
import useDayContext from "./useDayContext";

interface Props {
  setFullMap: React.Dispatch<React.SetStateAction<boolean>>;
  fullMap: boolean;
}

const DayBox = ({ fullMap, setFullMap }: Props) => {
  const { displayDayDate } = useDayContext();

  const [fullMapPolylines, setFullMapPolylines] = useState<LatLngExpression[]>([
    [0, 0],
  ]);
  const [fullMapCoordinates, setFullMapCoordinates] = useState<coordinatesType>(
    {} as coordinatesType
  );

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

  const mapPolylines = getMapPolylines(activities);
  const centerMapView = calculateCenterOfTheMapView(mapPolylines);

  return (
    <>
      {!fullMap ? (
        <>
          <div className="mt-4">
            <SumDistance sumsOfKm={sumOfKmPerDay} />
          </div>
          {activities?.map((activity, idx) => {
            return (
              <div
                className=" my-5 mx-10 border border-1 border-gray-300 rounded-md p-2 activity-font"
                key={activity.name}
              >
                <div className="flex items-center ">
                  <ActivityIcon activity={activity} />
                  <div className="ml-[20px] ">
                    <h1 className=" text-[15px] font-medium">
                      {activity.name}
                    </h1>
                  </div>
                </div>
                <div className="mt-10 pl-5">
                  <DayActivityProperty activity={activity} />
                </div>

                {centerMapView[idx].lat !== 0 ||
                centerMapView[idx].lng !== 0 ? (
                  <div>
                    <Map
                      coordinates={{
                        lat: centerMapView[idx].lat,
                        lng: centerMapView[idx].lng,
                      }}
                      mapPolylines={mapPolylines[idx]}
                      setFullMap={setFullMap}
                      setFullMapPolylines={setFullMapPolylines}
                      setFullMapCoordinates={setFullMapCoordinates}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </>
      ) : (
        <FullMap
          coordinates={{
            lat: fullMapCoordinates.lat,
            lng: fullMapCoordinates.lng,
          }}
          mapPolylines={fullMapPolylines}
          setFullMap={setFullMap}
        />
      )}
    </>
  );
};

export default DayBox;
