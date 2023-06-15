import React, { useEffect, useState } from "react";
import Map from "../../components/Map";
import OrderStatus from "../../components/order/OrderStatus";
import Rating from "../../components/order/Rating";
import type { FieldValues, UseFormSetValue } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { SignUpFormValues } from "../auth/signup";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const Order = () => {
  const [lng, setLng] = useState(110.377);
  const [lat, setLat] = useState(-7.77);
  const [lngMerchant, setLngMerchant] = useState(110.37);
  const [latMerchant, setLatMerchant] = useState(-7.779);
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState("");
  const [page, setPage] = useState(0);
  const { setValue } = useForm<SignUpFormValues>();
  const router = useRouter();
  const { index } = router.query;

  const getOrder = api.transaction.getOrder.useQuery({
    orderId: index as string,
  });

  const lng_lat = getOrder.data?.User.Alamat[0]?.alamat.split(",");
  const lng_latMerchant = getOrder.data?.Merchant?.alamat.split(",");

  useEffect(() => {
    // if (lng_lat && lng_latMerchant) {
    //   console.log(
    //     lng_lat[0],
    //     lng_lat[1],
    //     lng_latMerchant[0],
    //     lng_latMerchant[1]
    //   );
    //   setLng(lng_lat[0])!;
    //   setLat(lng_lat[1])!;
    //   setLngMerchant(lng_latMerchant[0])!;
    //   setLatMerchant(lng_latMerchant[1])!;
    // }

    if (
      lng_lat &&
      lng_latMerchant &&
      lng_lat[0] &&
      lng_lat[1] &&
      lng_latMerchant[0] &&
      lng_latMerchant[1]
    ) {
      setLng(parseFloat(parseFloat(lng_lat[1]).toFixed(3)));
      setLat(parseFloat(parseFloat(lng_lat[0]).toFixed(3)));
      setLngMerchant(parseFloat(parseFloat(lng_latMerchant[1]).toFixed(3)));
      setLatMerchant(parseFloat(parseFloat(lng_latMerchant[0]).toFixed(3)));
    }
  }, []);

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
          latMerchant={latMerchant}
          lngMerchant={lngMerchant}
          location={location}
          setLat={setLat}
          setLng={setLng}
          setLocation={setLocation}
          initialOptions={{}}
          checked={false}
          setValue={setValue as unknown as UseFormSetValue<FieldValues>}
        />
        <Rating formStep={page} order={() => setPage(0)} />
      </>
    );
  }
};

export default Order;
