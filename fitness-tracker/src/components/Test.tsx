import { DateTime } from "luxon";
import useStravaActivities from "../hooks/useStravaActivities";

// ? one week
// // Calculate Luxon DateTime objects for the start and end of September 18, 2023
// const startDate = DateTime.fromISO("2023-09-18T00:00:00Z");
// const endDate = DateTime.fromISO("2023-09-24T23:59:59Z");

// // Convert Luxon DateTime objects to epoch timestamps in seconds
// const startDateTimestamp = Math.floor(startDate.toSeconds());
// const endDateTimestamp = Math.floor(endDate.toSeconds());

// // Calculate timestamp for one day ago
// const oneDayAgo = DateTime.now().minus({ days: 2 }); // 2 days ago
// const oneDayAgoTimestamp = Math.floor(oneDayAgo.toSeconds());
// console.log(oneDayAgoTimestamp);

// //? one day
// Calculate Luxon DateTime objects for the start and end of September 20, 2023
const startDate = DateTime.fromISO("2023-09-20T00:00:00Z");
const endDate = DateTime.fromISO("2023-09-20T23:59:59Z");

// Convert Luxon DateTime objects to epoch timestamps in seconds
const startDateTimestamp = Math.floor(startDate.toSeconds());
const endDateTimestamp = Math.floor(endDate.toSeconds());

const Test = () => {
  const {
    data: activities,
    error,
    isLoading,
  } = useStravaActivities(startDateTimestamp, endDateTimestamp);

  console.log(activities);
  console.log(error);
  console.log("isLoading", isLoading);
  return (
    <div>
      Test
      {activities?.map((activity) => (
        <li>{activity.sport_type}</li>
      ))}
    </div>
  );
};

export default Test;
