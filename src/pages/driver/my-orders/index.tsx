import Head from "next/head";
import PesananMasuk from "../../../components/seller/PesananMasuk";
import { Fragment, useEffect, useState } from "react";
import PesananBatal from "../../../components/seller/PesananBatal";
import Image from "next/image";
import DetailPesanan from "../../../components/seller/DetailPesanan";
import { api } from "../../../utils/api";
import { numberFormat } from "../../../utils/transactions";

const MyOrders = () => {
  const [pop, setPop] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [detailPesanan, setDetailPesanan] = useState(false);

  const [sectionIdx, setSectionIdx] = useState(0);
  const sectionLabel = ["dalam proses", "riwayat"];

  const getOrder = api.transaction.getOrderMitra.useQuery();

  useEffect(() => {
    const data =
      getOrder.data?.filter(
        (item) => item.status == "accepted" && item.mitraId == null
      ) || [];
    if (data.length > 0) {
      setPop(true);
    }
  }, [getOrder.data]);

  const handleCancel = () => {
    setPop(false);
    setCancel(true);
  };

  const acceptOrder = api.transaction.acceptOrderMitra.useMutation();

  const totalOrderPending =
    getOrder.data?.filter(
      (item) => item.status == "accepted" && item.mitraId == null
    ) || [];
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
                if (item.status == "accepted" && item.mitraId == null) {
                  return (
                    <Fragment key={item.id}>
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
                              onClick={async () => {
                                await acceptOrder.mutateAsync({
                                  orderId: item.id,
                                });

                                await getOrder.refetch();
                              }}
                              className="rounded-full bg-primary-300 py-2 px-4 font-bold text-secondary-400"
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
                            onClick={() => setDetailPesanan(true)}
                          >
                            Detail Pesanan &gt;
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  );
                }
              })}
            </>
          )}
        </div>

        <PesananMasuk
          pop={pop}
          setPop={setPop}
          cancel={cancel}
          setCancel={setCancel}
          data={
            getOrder.data?.filter(
              (item) => item.status == "accepted" && item.mitraId == null
            )[0]
          }
          onClick={async () => {
            await acceptOrder.mutateAsync({
              orderId: getOrder.data?.filter(
                (item) => item.status == "accepted" && item.mitraId == null
              )[0]?.id as string,
            });

            await getOrder.refetch();
          }}
        />
        <PesananBatal cancel={cancel} setCancel={setCancel} />

        <DetailPesanan
          detailPesanan={detailPesanan}
          setDetailPesanan={setDetailPesanan}
          cancel={cancel}
          setCancel={setCancel}
        />
        <div className="grid w-full place-content-center">
          <button onClick={() => setPop(!pop)} className="bg-primary-500 p-4">
            <span className="text-xl">{pop}</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default MyOrders;
