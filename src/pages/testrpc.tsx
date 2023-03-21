import type { MouseEvent } from "react";
import { api } from "../utils/api";

const TestTrpc = () => {
  const merchant = api.merchant.listProduct.useMutation();

  const onSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    merchant
      .mutateAsync({
        labels: ["test"],
        price: 100,
        picture: "test",
        description: "test",
        productName: "test",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button className="bg-white" onClick={(e) => onSubmit(e)}>
      Test
    </button>
  );
};

export default TestTrpc;
