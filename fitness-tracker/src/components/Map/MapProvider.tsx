import { ReactNode, useState } from "react";
import MapContext from "./mapContext";
import { LatLngExpression } from "leaflet";
import { coordinatesType } from "./FullMap";

interface Props {
  children: ReactNode;
}

const MapProvider = ({ children }: Props) => {
  const [fullMap, setFullMap] = useState(false);

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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
