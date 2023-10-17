import { useEffect } from "react";
import { Polyline, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";

import "leaflet/dist/leaflet.css";
import { TileLayer } from "react-leaflet/TileLayer";
import { LatLngExpression } from "leaflet";
import useMapContext from "./useMapContext";
import { BsMap } from "react-icons/bs";

export interface coordinatesType {
  lat: number;
  lng: number;
}

interface Props {
  coordinates: coordinatesType;
  mapPolylines: LatLngExpression[];
}

const Map = ({ coordinates, mapPolylines }: Props) => {
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([coordinates.lat, coordinates.lng], map.getZoom());
    }, [map]);

    return null;
  };

  const {
    setFullMap,
    setFullMapPolylines,
    setFullMapCoordinates,
    setDefaultLayer,
    defaultLayer,
  } = useMapContext();

  const handleClick = () => {
    setFullMapPolylines(mapPolylines);
    setFullMapCoordinates(coordinates);
    setFullMap(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLayerSwitch = (e: any) => {
    e.stopPropagation();
    setDefaultLayer(!defaultLayer);
  };

  const defaultMap =
    "https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=YBi9f27w4DIZfxr4OHJfg1MQSCeQerLL8fh0e9ZuVLBWciU2pFOzXcFzgWVdWk1v";

  const streetMap =
    "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

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
          url={`${defaultLayer ? defaultMap : streetMap}`}
          attribution='&copy; <a href="https://www.jawg.io/">Jawg</a>'
        />

        <Polyline pathOptions={{ color: "blue" }} positions={mapPolylines} />
        <MapUpdater />

        <div
          className="layer-switcher-map-icon"
          onClick={(e) => handleLayerSwitch(e)}
        >
          <BsMap size={23} />
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;
