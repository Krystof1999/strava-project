import { LatLngExpression } from "leaflet";
import { Activity } from "../../entities/Activity";
import polyline from "@mapbox/polyline";
import { coordinatesType } from "../Map/Map";

export const getMapPolylines = (
  activities: Activity[]
): LatLngExpression[][] => {
  return activities.map((activity) => {
    const activity_polyline = activity.map.summary_polyline;
    const decodedMapPolyline = polyline.decode(
      activity_polyline
    ) as LatLngExpression[];
    return decodedMapPolyline;
  });
};

export function calculateCenterOfTheMapView(
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
