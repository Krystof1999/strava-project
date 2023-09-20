import axios from "axios";
import { useEffect } from "react";

function App() {
  const clientID = "113941";
  const clientSecret = "e1a171cf2a2b433f9114da11f04133845500d171";
  const refreshToken = "a3d56d1c76d837a5f835e21e8ffcb9bc7025da4d";
  const auth_link = "https://www.strava.com/oauth/token";

  useEffect(() => {
    const getDataFromStrava = async () => {
      const stravaAccesToken = await axios.all([
        axios.post(
          `${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
        ),
      ]);

      const stravaActivity = await axios.get(
        `https://www.strava.com/api/v3/athlete/activities?access_token=${stravaAccesToken[0].data.access_token}`
      );
      console.log(stravaActivity);
    };

    getDataFromStrava();
  }, []);
  return <></>;
}

export default App;
