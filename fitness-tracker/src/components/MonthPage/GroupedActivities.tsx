import useStravaActivities from "../../hooks/useStravaActivities";
import ActivityIcon from "../ActivityIcon";
import LazyIcon from "../LazyIcon";
import SumDistance from "../SumDistance";
import {
  getActivityDistanceSum,
  getGroupActivitiesByType,
} from "../utils/activityUtils";
import EmptyMonthBox from "./EmptyMonthBox";

interface Props {
  startTimeStamp: number;
  endTimeStamp: number;
}

const GroupedActivities = ({ startTimeStamp, endTimeStamp }: Props) => {
  const {
    data: activities,
    isLoading,
    error,
  } = useStravaActivities(startTimeStamp, endTimeStamp);

  if (isLoading) return <p>loading...</p>; // todo -sceleton
  if (error) return <EmptyMonthBox />;
  if (activities.length === 0) return <LazyIcon />;

  const groupActivitiesByType = getGroupActivitiesByType(activities);
  const sumOfKm = getActivityDistanceSum(activities);

  return (
    <>
      <SumDistance sumsOfKm={sumOfKm} />
      {groupActivitiesByType.map((activity, idx) => (
        <div className="flex items-center gap-3" key={activity.sport_type}>
          <>
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <ActivityIcon
                activityType={groupActivitiesByType[idx].sport_type}
              />
            </div>
            <div>
              <p>{`${(activity.total_distance / 1000).toFixed(1)} km`}</p>
            </div>
          </>
        </div>
      ))}
    </>
  );
};

export default GroupedActivities;
