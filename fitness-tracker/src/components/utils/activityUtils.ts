import { Activity } from "../../entities/Activity";

export const getActivityDistanceSum = (activities: Activity[] | undefined) => {
  //* Calculate the sum of the kilometers per day
  const activityDistances = activities?.map((a) => a.distance);
  const sumOfActivityDistances = activityDistances?.reduce(
    (prevValue, currentValue) => prevValue + currentValue,
    0
  );
  return (sumOfActivityDistances! / 1000).toFixed(0);
};
