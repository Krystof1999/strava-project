import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Activity } from "../entities/Activity";

const clientID = "113941";
const clientSecret = "e1a171cf2a2b433f9114da11f04133845500d171";
const refreshToken = "a3d56d1c76d837a5f835e21e8ffcb9bc7025da4d";
const auth_link = "https://www.strava.com/oauth/token";

const useStravaActivities = (
  startDateTimestamp?: number,
  endDateTimestamp?: number
) => {
  const fetchActivities = async () => {
    const stravaAccesToken = await axios.post(
      `${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
    );

    const perPage = 30; // Number of activities per page (default 30)
    let page = 1; // Initial page

    let allActivities: Activity[] = [];

    const condition = true;
    while (condition) {
      const stravaActivity = await axios.get<Activity[]>(
        `https://www.strava.com/api/v3/athlete/activities`,
        {
          params: {
            access_token: stravaAccesToken.data.access_token,
            after: startDateTimestamp,
            before: endDateTimestamp,
            per_page: perPage,
            page: page,
          },
        }
      );

      if (stravaActivity.data.length === 0) {
        // No more activities to fetch, exit the loop
        break;
      }

      // Concatenate the new activities to the existing ones
      allActivities = allActivities.concat(stravaActivity.data);

      // Move to the next page (fetch other activities)
      page++;
    }

    return allActivities;
  };

  return useQuery<Activity[], Error>({
    queryKey: ["activities", startDateTimestamp, endDateTimestamp],
    queryFn: fetchActivities,
    retry: 0,
  });
};

export default useStravaActivities;
