import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type MapProps = {
  location: string;
  latitude: number;
  longitude: number;
};

const Map = ({ location, latitude, longitude }: MapProps) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export { Map };
