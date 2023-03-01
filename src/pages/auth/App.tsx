/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>

      {/* use aria-invalid to indicate field contain error */}
      <input
        id="name"
        aria-invalid={errors.name ? "true" : "false"}
        {...register('name', { required: true, maxLength: 30 })}
      />
      
      {/* use role="alert" to announce the error message */}
      {errors.name && errors.name.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {errors.name && errors.name.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}
      
      <input type="submit" />
    </form>
  );
}

