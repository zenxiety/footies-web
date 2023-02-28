import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const pin = new Icon({
  iconUrl: "/signup/pin.svg",
  iconSize: [36, 36],
});

export default function Map() {
  return (
    <MapContainer
      // -7.72719542053974, 110.3956993506416
      center={[-7.72719542053974, 110.3956993506416]}
      zoom={17}
      scrollWheelZoom={false}
      className="mx-5 h-96 border-4 border-primary-300"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-7.72719542053974, 110.3956993506416]} icon={pin}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
