import { ReactNode, useState } from "react";
import MapContext from "./mapContext";
import { LatLngExpression } from "leaflet";
import { coordinatesType } from "./FullMap";

interface Props {
  children: ReactNode;
}

const MapProvider = ({ children }: Props) => {
  const [fullMap, setFullMap] = useState(false);
  const [defaultLayer, setDefaultLayer] = useState(true);

  const [fullMapPolylines, setFullMapPolylines] = useState<LatLngExpression[]>([
    [0, 0],
  ]);
  const [fullMapCoordinates, setFullMapCoordinates] = useState<coordinatesType>(
    {} as coordinatesType
  );

  return (
    <MapContext.Provider
      value={{
        fullMap,
        setFullMap,
        fullMapPolylines,
        setFullMapPolylines,
        fullMapCoordinates,
        setFullMapCoordinates,
        defaultLayer,
        setDefaultLayer,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
