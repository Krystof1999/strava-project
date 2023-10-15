import { useEffect } from "react";
import { Polyline, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";

import "leaflet/dist/leaflet.css";
import { TileLayer } from "react-leaflet/TileLayer";

export interface coordinatesType {
  lat: number;
  lng: number;
}

interface Props {
  coordinates: coordinatesType;
  mapPolylines: number[][];
  setFullMap: React.Dispatch<React.SetStateAction<boolean>>;
  setFullMapPolylines: React.Dispatch<React.SetStateAction<number[][]>>;
  setFullMapCoordinates: React.Dispatch<React.SetStateAction<coordinatesType>>;
}

const Map = ({
  coordinates,
  mapPolylines,
  setFullMap,
  setFullMapPolylines,
  setFullMapCoordinates,
}: Props) => {
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([coordinates.lat, coordinates.lng], map.getZoom());
    }, [map]);

    return null;
  };

  const handleClick = () => {
    // console.log(mapPolylines);
    setFullMapPolylines(mapPolylines);
    setFullMapCoordinates(coordinates);
    setFullMap(true);
  };

  return (
    <div onClick={() => handleClick()}>
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
        zoomControl={false}
      >
        <TileLayer
          url="https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=YBi9f27w4DIZfxr4OHJfg1MQSCeQerLL8fh0e9ZuVLBWciU2pFOzXcFzgWVdWk1v"
          attribution='&copy; <a href="https://www.jawg.io/">Jawg</a>'
        />

        <Polyline pathOptions={{ color: "blue" }} positions={mapPolylines} />
        <MapUpdater />
      </MapContainer>
    </div>
  );
};

export default Map;
