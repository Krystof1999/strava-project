import { useEffect, useState } from "react";
import { ZoomControl, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";

import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";

export interface coordinatesType {
  lat: number;
  lng: number;
}

interface Props {
  coordinates: coordinatesType;
}

const Map = ({ coordinates }: Props) => {
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([coordinates.lat, coordinates.lng], map.getZoom());
    }, [coordinates, map]);

    return null;
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640); // todo - maybe remove

  useEffect(() => {
    const handleResize = () => {
      // todo - maybe remove
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="map-section" className=" w-full h-screen">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={13}
        scrollWheelZoom={true}
        id="map"
        zoomControl={false}
      >
        {!isSmallScreen && <ZoomControl />}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[coordinates.lat, coordinates.lng]}> */}
        {/* <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup> */}
        {/* </Marker> */}
        <MapUpdater />
      </MapContainer>
    </div>
  );
};

export default Map;
