import { useState, createContext, useContext, ReactNode } from "react";

export type FormValues = {
  nama: string;
  alamat: string;
  jamBuka: string;
  jamTutup: string;
  deskripsi?: string;
  labels: string[];
  dokumen: string;
  apiError?: string;
};

type FormContext = {
  data: FormValues;
  setFormValues: (values: object) => void;
};
export const FormContext = createContext<FormContext>({} as FormContext);

export default function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FormValues>({} as FormValues);

  const setFormValues = (values: object) => {
    console.log(data, values);
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <FormContext.Provider value={{ data, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormData = () => useContext(FormContext);
