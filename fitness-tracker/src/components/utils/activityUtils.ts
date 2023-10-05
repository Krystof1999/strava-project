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

// Define the shape of the groupedActivities object
interface GroupedActivity {
  sport_type: string;
  total_distance: number;
}

export const getGroupActivitiesByType = (activities: Activity[]) => {
  // Use Array.prototype.reduce to group activities by sport_type and calculate the sum of distances
  const groupedActivities: Record<string, GroupedActivity> = activities.reduce(
    (groupedActivity, activity) => {
      const sportType: string = activity.sport_type;

      // Check if a group for this sport_type already exists, if not, create one
      if (!groupedActivity[sportType]) {
        groupedActivity[sportType] = {
          sport_type: sportType,
          total_distance: 0,
        };
      }

      // Add the distance of the current activity to the total_distance of the group
      groupedActivity[sportType].total_distance += activity.distance;

      return groupedActivity;
    },
    {} as Record<string, GroupedActivity>
  );

  // Convert the groupedActivities object back to an array if needed
  //   console.log(groupedActivities);
  const groupedActivitiesArray = Object.values(groupedActivities);
  return groupedActivitiesArray;
};
