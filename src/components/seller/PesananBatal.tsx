import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

const PesananBatal = ({
  cancel,
  setCancel,
}: {
  cancel: boolean;
  setCancel: Dispatch<SetStateAction<boolean>>;
}) => {
  const [confirm, setConfirm] = useState(true);

  return (
    <>
      <div
        className={`fixed top-0 bottom-0 left-1/2 z-[60] w-full -translate-x-1/2 bg-others-black/80 backdrop-blur-sm duration-[800ms] xs:w-[500px] ${
          cancel ? "" : "pointer-events-none opacity-0"
        }`}
      >
        <Confirm
          cancel={cancel}
          setCancel={setCancel}
          confirm={confirm}
          setConfirm={setConfirm}
        />
        <Cause
          cancel={cancel}
          setCancel={setCancel}
          confirm={confirm}
          setConfirm={setConfirm}
        />
      </div>
    </>
  );
};

export default PesananBatal;

const Confirm = ({
  cancel,
  setCancel,
  confirm,
  setConfirm,
}: {
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
  cancel: boolean;
  setCancel: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleCancel = () => {
    setCancel(false);
    setConfirm(true);
  };

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 z-[60] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-primary-300 bg-secondary-500 p-8 text-white duration-[800ms] xs:w-[450px] ${
          confirm ? "" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex gap-x-3">
          <Image
            src="/assets/question.svg"
            alt=""
            width={46}
            height={40}
            quality={100}
          />
          <span className="font-literata text-lg">
            Apakah anda yakin ingin menyelesaikan pesanan?
          </span>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => handleCancel()}
            className="rounded-md border border-primary-300 px-3 font-literata text-lg"
          >
            Tidak
          </button>
          <button
            onClick={() => setConfirm(!confirm)}
            className="rounded-md border border-primary-300 bg-primary-300 px-3 font-literata text-lg text-secondary-500"
          >
            Ya
          </button>
        </div>
      </div>
    </>
  );
};

const Cause = ({
  cancel,
  setCancel,
  confirm,
  setConfirm,
}: {
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
  cancel: boolean;
  setCancel: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleCancel = () => {
    setCancel(false);
    setConfirm(true);
  };
  return (
    <>
      <form
        className={`fixed top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-primary-300 bg-secondary-500 p-8 text-white duration-[800ms] xs:w-[450px] ${
          confirm ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <div className="mt-1 mb-2 grid place-content-center">
          <Image
            src="/assets/danger.svg"
            alt=""
            width={46}
            height={40}
            quality={100}
          />
        </div>
        <p className="mb-6 px-7 font-literata text-lg">
          Mengapa anda ingin membatalkan pesanan?
        </p>
        <textarea
          className="placeholder: h-[100px] w-full resize-none rounded-sm border bg-transparent px-1"
          placeholder="Penyebab pesanan dibatalkan"
        />
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => handleCancel()}
            className="rounded-md border border-primary-300 px-3 font-literata text-lg"
          >
            Tidak
          </button>
          <button className="rounded-md border border-failed bg-failed px-3 font-literata text-lg">
            Batalkan
          </button>
        </div>
      </form>
    </>
  );
};
