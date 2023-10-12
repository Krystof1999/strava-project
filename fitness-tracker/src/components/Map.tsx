import { useEffect } from "react";
import { Polyline, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";

import "leaflet/dist/leaflet.css";
import { TileLayer } from "react-leaflet/TileLayer";
import { LatLngExpression } from "leaflet";

export interface coordinatesType {
  lat: number;
  lng: number;
}

interface Props {
  coordinates: coordinatesType;
  mapPolylines: LatLngExpression[][];
}

const Map = ({ coordinates, mapPolylines }: Props) => {
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([coordinates.lat, coordinates.lng], map.getZoom());
    }, [map]);

    return null;
  };

  const limeOptions = { color: "lime" };

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={13}
      scrollWheelZoom={true}
      id="map"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline pathOptions={limeOptions} positions={mapPolylines} />

      <MapUpdater />
    </MapContainer>
  );
};

export default Map;
