import { useState, createContext, useContext } from "react";
export type FormContext = {
  data: object;
  setFormValues: (values: object) => void;
};
export const FormContext = createContext<FormContext>({
  data: {},
  setFormValues: () => {},
});

export default function FormProvider({ children }: { children: any }) {
  const [data, setData] = useState({});

  const setFormValues = (values: object) => {
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
