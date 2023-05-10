import React, { useState } from "react";
import Cartlist from "../components/cartlist/cartlist";
import Payment from "../components/cartlist/payment";
import Promo from "../components/cartlist/promo";
import Ketentuan from "../components/cartlist/ketentuan";

const Cart = () => {
  const [page, setPage] = useState(0);
  if (page === 0) {
    return (
      <>
        <Cartlist
          formStep={page}
          paymentStep={() => setPage(1)}
          promoStep={() => setPage(2)}
        />
      </>
    );
  } else if (page === 1) {
    return (
      <>
        <Payment formStep={page} cartStep={() => setPage(0)} />
      </>
    );
  } else if (page === 2) {
    return (
      <>
        <Promo
          formStep={page}
          cartStep={() => setPage(0)}
          ketentuanStep={() => setPage(3)}
        />
      </>
    );
  } else if (page === 3) {
    return (
      <>
        <Ketentuan formStep={page} promoStep={() => setPage(2)} />
      </>
    );
  }
};

export default Cart;
