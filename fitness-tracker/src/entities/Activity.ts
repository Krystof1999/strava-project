import { Map } from "./Map";

export interface Activity {
  name: string;
  average_speed: number;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  elev_high: number;
  max_speed: number;
  sport_type: string;
  map: Map;
}
