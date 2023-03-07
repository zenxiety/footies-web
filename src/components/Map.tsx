import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { setTimeout } from "timers";

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onMapLoaded?(map: mapboxgl.Map): void;
  onMapRemoved?(): void;
}

const ACCESS_TOKEN =
  "pk.eyJ1IjoiYW5keWFueW9nYSIsImEiOiJjbGV0enpqeTMwZHM3M3BxczRmMGNlamhjIn0.aXqodhcvheXuFbt_1HOM_g";

function MapboxMap({
  initialOptions = {},
  onMapLoaded,
  lat,
  lng,
  location,
  setLat,
  setLng,
  setLocation,
  setCoord,
}: {
  initialOptions: MapboxMapProps;
  onMapLoaded?: (map: mapboxgl.Map) => void;
  lat: number;
  lng: number;
  location: string;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  setLocation: (location: string) => void;
  setCoord: (location: string) => void;
}) {
  const [map, setMap] = useState<mapboxgl.Map>();

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    let centerLat = -7.7271522633671035;
    let centerLng = 110.39571281396404;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        centerLat = pos.coords.latitude;
        centerLng = pos.coords.longitude;
        // console.log(centerLat, centerLng);
      });
    }
    console.log(centerLat, centerLng);

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [centerLng, centerLat],
      zoom: 16,
      ...initialOptions,
    });

    setMap(mapboxMap);

    // if (onMapLoaded) mapboxMap.once("load", onMapLoaded);

    return () => {
      mapboxMap.remove();
      // if (onMapRemoved) onMapRemoved();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!map) return; // wait for map to initialize
      map.on("move", () => {
        setLat(map.getCenter().lat);
        setLng(map.getCenter().lng);
      });
    }, 4000);
    navigator.geolocation.getCurrentPosition((pos) => {
      // const { lng, lat } = lonlat;
      fetch(
        `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${lng}%2C${lat}`
      )
        .then((res) => res.json())
        .then((data: { address: { Match_addr: string } }) =>
          setLocation(data.address.Match_addr)
        )
        .catch((e) => console.log(e));
      // console.log(data.address.Match_addr);
      setCoord(`${lat}, ${lng}`);
    });
  }, [map, lat, lng]);

  return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap;
