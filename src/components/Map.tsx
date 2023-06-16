import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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
  latMerchant?: number;
  lngMerchant?: number;
  coord: string;
  location: string;
  setLat: Dispatch<SetStateAction<number>>;
  setLng: Dispatch<SetStateAction<number>>;
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
  latMerchant,
  lngMerchant,
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat1 = pos.coords.latitude;
        const lng1 = pos.coords.longitude;
        mapboxMap.flyTo({ center: [lng1, lat1] });
        setLat(() => pos.coords.latitude);
        setLng(() => pos.coords.longitude);
      });
    }

    return () => {
      mapboxMap.remove();
      // if (onMapRemoved) onMapRemoved();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [route, setRoute] = useState<GeoJSON.Position[]>([]);

  useEffect(() => {
    const link =
      lngMerchant && latMerchant
        ? `https://api.mapbox.com/directions/v5/mapbox/driving/${lng},${lat};${lngMerchant},${latMerchant}?geometries=geojson&access_token=${ACCESS_TOKEN}`
        : `https://api.mapbox.com/directions/v5/mapbox/driving/${lng},${lat}?geometries=geojson&access_token=${ACCESS_TOKEN}`;
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const data2 = data.routes[0];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setRoute(data2.geometry.coordinates);
      })
      .catch((e) => console.log(e));
  }, [map]);

  useEffect(() => {
    if (lngMerchant && latMerchant) {
      map?.on("load", () => {
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        new mapboxgl.Marker().setLngLat([lngMerchant, latMerchant]).addTo(map);
      });
      map?.on("load", () => {
        if (map?.getLayer("route")) map?.removeLayer("route");
        if (map?.getSource("route")) map?.removeSource("route");
        map?.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: route,
              },
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#ff0000",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      });
    }
  }, [map, route, lat, lng, latMerchant, lngMerchant]);

  useEffect(() => {
    if (!map) return; // wait for map to initialize
    map.on("dragend", () => {
      setLat(map.getCenter().lat);
      setLng(map.getCenter().lng);
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
