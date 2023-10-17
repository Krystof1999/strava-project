import { useEffect } from "react";
import { Polyline, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";

import "leaflet/dist/leaflet.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsMap } from "react-icons/bs";
import { TileLayer } from "react-leaflet/TileLayer";
import useMapContext from "./useMapContext";

export interface coordinatesType {
  lat: number;
  lng: number;
}

const FullMap = () => {
  const {
    setFullMap,
    fullMapCoordinates,
    fullMapPolylines,
    setDefaultLayer,
    defaultLayer,
  } = useMapContext();

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(
        [fullMapCoordinates.lat, fullMapCoordinates.lng],
        map.getZoom()
      );
    }, [map]);

    return null;
  };

  const handleCose = () => {
    setFullMap(false);
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
    <MapContainer
      center={[fullMapCoordinates.lat, fullMapCoordinates.lng]}
      zoom={13}
      scrollWheelZoom={true}
      className="map-full"
      zoomControl={false}
    >
      <TileLayer
        url={`${defaultLayer ? defaultMap : streetMap}`}
        attribution='&copy; <a href="https://www.jawg.io/">Jawg</a>'
      />

      <Polyline pathOptions={{ color: "blue" }} positions={fullMapPolylines} />
      <MapUpdater />

      <div className="close-full-map-icon" onClick={() => handleCose()}>
        <AiOutlineCloseCircle size={30} />
      </div>
      <div
        className="layer-switcher-fullMap-icon"
        onClick={(e) => handleLayerSwitch(e)}
      >
        <BsMap size={30} />
      </div>
    </MapContainer>
  );
};

export default FullMap;
