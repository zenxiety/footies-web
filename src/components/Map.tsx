import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { setInterval, setTimeout } from "timers";
import { SellerFormValues } from "../pages/auth/signup/seller";

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onMapLoaded?(map: mapboxgl.Map): void;
  onMapRemoved?(): void;
}

type props = {
  initialOptions: MapboxMapProps;
  onMapLoaded?: (map: mapboxgl.Map) => void;
  lat: number;
  lng: number;
  coord: string;
  location: string;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  setLocation: (location: string) => void;
  setCoord: (location: string) => void;
  checked: boolean;
  setValue: UseFormSetValue<FieldValues>;
};

const ACCESS_TOKEN =
  "pk.eyJ1IjoiYW5keWFueW9nYSIsImEiOiJjbGV0enpqeTMwZHM3M3BxczRmMGNlamhjIn0.aXqodhcvheXuFbt_1HOM_g";

const MapboxMap = ({
  initialOptions = {},
  onMapLoaded,
  lat,
  lng,
  coord,
  location,
  setLat,
  setLng,
  setLocation,
  setCoord,
  checked,
  setValue,
}: props) => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapNode = useRef(null);

  useEffect(() => {
    fetch(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${lng}%2C${lat}`
    )
      .then((res) => res.json())
      .then((data: { address: { Match_addr: string } }) =>
        setLocation(data.address.Match_addr)
      )
      .catch((e) => console.log(e));

    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      });
    }

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 16,
      ...initialOptions,
    });

    setMap(mapboxMap);

    if (onMapLoaded) mapboxMap.once("load", onMapLoaded);

    return () => {
      mapboxMap.remove();
      // if (onMapRemoved) onMapRemoved();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return; // wait for map to initialize
    map.on("dragend", () => {
      setLat(map.getCenter().lat);
      setLng(map.getCenter().lng);
      console.log(map.getCenter().lat);
      console.log(map.getCenter().lng);
    });
  }, [map]);

  useEffect(() => {
    setCoord(`${lat},${lng}`);
    fetch(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${lng}%2C${lat}`
    )
      .then((res) => res.json())
      .then((data: { address: { Match_addr: string } }) =>
        setValue("alamat", data.address.Match_addr)
      )
      .catch((e) => console.log(e));
  }, [map, lat, lng, coord]);

  return (
    <div
      ref={mapNode}
      className="h-full w-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default MapboxMap;
