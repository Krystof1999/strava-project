import { LatLngExpression } from "leaflet";
import React from "react";
import { coordinatesType } from "./FullMap";

interface MapContextType {
  defaultLayer: boolean;
  setDefaultLayer: React.Dispatch<React.SetStateAction<boolean>>;
  fullMap: boolean;
  setFullMap: React.Dispatch<React.SetStateAction<boolean>>;
  fullMapPolylines: LatLngExpression[];
  setFullMapPolylines: React.Dispatch<React.SetStateAction<LatLngExpression[]>>;
  fullMapCoordinates: coordinatesType;
  setFullMapCoordinates: React.Dispatch<React.SetStateAction<coordinatesType>>;
}

const MapContext = React.createContext<MapContextType>({} as MapContextType);

export default MapContext;
