import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Map {
  summary_polyline: string;
}

interface Activity {
  name: string;
  average_speed: number;
  distance: number;
  elapsed_time: number;
  moving_time: number; // todo - choose only one time
  max_speed: number;
  sport_type: string;
  type: string; // todo - choose only one type
  map: Map;
}

const clientID = "113941";
const clientSecret = "e1a171cf2a2b433f9114da11f04133845500d171";
const refreshToken = "a3d56d1c76d837a5f835e21e8ffcb9bc7025da4d";
const auth_link = "https://www.strava.com/oauth/token";

const useStravaActivities = (
  startDateTimestamp: number,
  endDateTimestamp: number
) => {
  const fetchActivities = async () => {
    const stravaAccesToken = await axios.all([
      axios.post(
        `${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
      ),
    ]);

    const stravaActivity = await axios.get<Activity[]>(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${stravaAccesToken[0].data.access_token}`,
      { params: { after: startDateTimestamp, before: endDateTimestamp } }
    );

    return stravaActivity.data;
  };

  return useQuery<Activity[], Error>({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });
};

export default useStravaActivities;
