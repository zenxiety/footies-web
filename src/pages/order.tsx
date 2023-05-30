import React, { useState } from "react";
import Map from "../components/Map";
import OrderStatus from "../components/order/OrderStatus";
import Rating from "../components/order/Rating";
import type { FieldValues, UseFormSetValue } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { SignUpFormValues } from "./auth/signup";

const Order = () => {
  const [lng, setLng] = useState(110.37767682106005);
  const [lat, setLat] = useState(-7.770797393657097);
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState("");
  const [page, setPage] = useState(0);
  const { 
    setValue,
  } = useForm<SignUpFormValues>();
  if (page === 0) {
    return (
      <>
        <OrderStatus formStep={page} rating={() => setPage(1)} />
      </>
    );
  } else {
    return (
      <>
        <Map
          setCoord={setCoord}
          coord={coord}
          lat={lat}
          lng={lng}
          location={location}
          setLat={setLat}
          setLng={setLng}
          setLocation={setLocation}
          initialOptions={{}}
          checked={false}
          setValue={setValue as unknown as UseFormSetValue<FieldValues>}
        />
        ;
        <Rating formStep={page} order={() => setPage(0)} />
      </>
    );
  }
};

export default Order;
