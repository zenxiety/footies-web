import type { Context, ReactNode } from "react";
import { useState, createContext, useContext } from "react";

type T = object;

type FormContext<Form extends T> = {
  data: Form;
  setFormValues: (values: object) => void;
};

export const FormContext = createContext({} as FormContext<T>);

export default function FormProvider<Form extends T>({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<Form>({} as Form);

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

export function useFormData<Form extends T>() {
  return useContext<FormContext<Form>>(
    FormContext as unknown as Context<FormContext<Form>>
  );
}
