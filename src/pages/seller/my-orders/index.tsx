import Head from "next/head";
import PesananMasuk from "../../../components/seller/PesananMasuk";
import { Dispatch, SetStateAction, useState, Fragment, useEffect } from "react";
import PesananBatal from "../../../components/seller/PesananBatal";
import Image from "next/image";
import DetailPesanan from "../../../components/seller/DetailPesanan";
import PesananSelesai from "../../../components/seller/PesananSelesai";

import { Role } from "@prisma/client";
import { numberFormat } from "../../../utils/transactions";
import { api } from "../../../utils/api";

const MyOrders = () => {
  const [roles, setRoles] = useState<Role>("MERCHANT");

  const [pop, setPop] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [complete, setComplete] = useState(false);
  const [detailPesanan, setDetailPesanan] = useState(false);
  const [idDetailPesanan, setIdDetailPesanan] = useState<string>("");

  const [sectionIdx, setSectionIdx] = useState(0);
  const sectionLabel = ["dalam proses", "riwayat"];

  const getOrder = api.transaction.getOrderMerchant.useQuery();

  const handleCancel = () => {
    setPop(false);
    setCancel(true);
  };

  useEffect(() => {
    const data =
      getOrder.data?.filter((item) => item.status == "pending") || [];
    if (data && data.length > 0) {
      console.log(data);
      setPop(true);
    }
  }, [getOrder.data]);

  const totalOrderPending =
    getOrder.data?.filter((item) => item.status == "pending") || [];

  const totalOrderProses =
    getOrder.data?.filter(
      (item) => item.status == "accepted" && item.mitraId == null
    ) || [];

  const acceptOrder = api.transaction.acceptOrderMerchant.useMutation();

  const detailPesananHandler = (id: string) => {
    setIdDetailPesanan(id);
    setDetailPesanan(true);
  };

  return (
    <>
      <Head>
        <title>My Orders - Footies</title>
      </Head>
      <style jsx>{`
        .countdown {
          animation: countdown 60s linear infinite;
        }

        @keyframes countdown {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
      <section
        className={`relative min-h-screen overflow-hidden bg-secondary-500 pt-[2.5vh] font-louis text-others-white`}
      >
        <span className="ml-5 font-literata text-2xl">Pesanan</span>
        <hr className="my-4 border-secondary-300" />
        <div className="ml-5 mb-7 flex gap-x-1">
          {sectionLabel.map((section, i) => (
            <button
              key={i}
              onClick={() => setSectionIdx(i)}
              className={`relative px-3 pb-3 text-center capitalize duration-300 ${
                sectionIdx == i ? "" : "text-secondary-100"
              }`}
            >
              {section}
              <div
                className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-primary-300 duration-500 ${
                  sectionIdx == i ? "w-full" : "w-0"
                }`}
              ></div>
            </button>
          ))}
        </div>
        <div>
          {totalOrderPending.length > 0 && (
            <>
              <span className="ml-7 text-secondary-100">
                Pesanan baru{" "}
                <span className="text-primary-300">
                  ({totalOrderPending?.length})
                </span>
              </span>
              {getOrder.data?.map((item) => {
                if (item.status == "pending") {
                  return (
                    <>
                      <div className="my-3 bg-secondary-400 px-7 py-2">
                        <div className="flex items-center justify-between">
                          <span className="font-literata text-2xl font-bold text-primary-300">
                            {item.Cart?.CartMenu.length} items
                          </span>
                          <span className="font-bold">
                            {numberFormat(item.total)}
                          </span>
                        </div>
                        <p className="max-h-[3em] overflow-hidden">
                          {item.Cart?.CartMenu.map((item) => item.Menu.nama)}
                        </p>
                        <p className="text-xs text-secondary-100">
                          Pemesan: {item.User.firstName} {item.User.lastName}
                        </p>
                        <p className="text-xs text-secondary-100">
                          ID Pesanan: {item.id}
                        </p>
                        <div className="relative mt-6">
                          <div className="flex justify-between pl-3">
                            <button onClick={() => handleCancel()}>
                              <Image
                                src="/assets/cancel.svg"
                                alt=""
                                width={20}
                                height={20}
                                quality={100}
                              />
                            </button>
                            <button
                              className="rounded-full bg-primary-300 py-2 px-4 font-bold text-secondary-400"
                              onClick={async () => {
                                await acceptOrder.mutateAsync({
                                  orderId: item.id,
                                });

                                await getOrder.refetch();
                              }}
                            >
                              Terima
                            </button>
                          </div>
                          <div className="relative my-8">
                            <div className="absolute bottom-2 h-1 w-full bg-secondary-300"></div>
                            <div
                              className={`countdown absolute bottom-2 h-1 bg-white`}
                            ></div>
                          </div>
                          <button
                            className="ml-auto block text-xs text-primary-300"
                            onClick={() => detailPesananHandler(item.id)}
                          >
                            Detail Pesanan &gt;
                          </button>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </>
          )}
          {totalOrderProses.length > 0 && (
            <>
              <span className="ml-7 text-secondary-100">
                Pesanan dalam proses
              </span>
              {getOrder.data?.map((item) => {
                if (item.status == "accepted" && item.mitraId == null) {
                  return (
                    <div
                      key={item.id}
                      className="my-3 bg-secondary-400 px-7 py-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-literata text-2xl font-bold text-primary-300">
                          {item.Cart?.CartMenu.length} items
                        </span>
                        <span className="font-bold">
                          {numberFormat(item.total)}
                        </span>
                      </div>
                      <p className="max-h-[3em] overflow-hidden">
                        {item.Cart?.CartMenu.map((item) => item.Menu.nama)}
                      </p>
                      <p className="text-xs text-secondary-100">
                        Pemesan: {item.User.firstName} {item.User.lastName}
                      </p>
                      <p className="text-xs text-secondary-100">
                        ID Pesanan: {item.id}
                      </p>
                      <div className="relative mt-3">
                        <button
                          className="ml-auto block text-xs text-primary-300"
                          onClick={() => detailPesananHandler(item.id)}
                        >
                          Detail Pesanan &gt;
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </>
          )}
          <DetailPesanan
            roles={roles}
            detailPesanan={detailPesanan}
            setDetailPesanan={setDetailPesanan}
            cancel={cancel}
            setCancel={setCancel}
            data={
              getOrder.data?.filter((item) => item.id == idDetailPesanan)[0]
            }
            onClick={async () => {
              await acceptOrder.mutateAsync({
                orderId: idDetailPesanan,
              });

              await getOrder.refetch();
            }}
          />
          <PesananMasuk
            roles={roles}
            pop={pop}
            setPop={setPop}
            cancel={cancel}
            complete={complete}
            detailPesanan={detailPesanan}
            setCancel={setCancel}
            setComplete={setComplete}
            setDetailPesanan={setDetailPesanan}
          />
          <PesananBatal cancel={cancel} setCancel={setCancel} />
          <PesananSelesai complete={complete} setComplete={setComplete} />
          <div className="grid w-full place-content-center">
            <button onClick={() => setPop(!pop)} className="bg-primary-500 p-4">
              <span className="text-xl">{pop}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrders;

const DummyOrder = ({
  setDetailPesanan,
}: {
  setDetailPesanan: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="my-3 bg-secondary-400 px-7 py-2">
        <div className="flex items-center justify-between">
          <span className="font-literata text-2xl font-bold text-primary-300">
            3 items
          </span>
          <span className="font-bold">Rp54.000</span>
        </div>
        <p className="max-h-[3em] overflow-hidden">
          1 Burger Babi, 2 Burger Babi apa Babi, 1 Burger Babi Vegan, 2 Burger
          bingung, 1 Burger Babi, 2 Burger Babi apa Babi, 1 Burger Babi Vegan, 2
          Burger bingung, 1 Burger Babi, 2 Burger Babi apa Babi, 1 Burger Babi
          Vegan, 2 Burger bingung, ...
        </p>
        <p className="text-xs text-secondary-100">Pemesan: Diki Bagastama</p>
        <p className="text-xs text-secondary-100">ID Pesanan: 696969</p>
        <div className="relative mt-3">
          <button
            className="ml-auto block text-xs text-primary-300"
            onClick={() => setDetailPesanan(true)}
          >
            Detail Pesanan &gt;
          </button>
        </div>
      </div>
    </>
  );
};
