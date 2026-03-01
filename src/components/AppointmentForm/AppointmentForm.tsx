// src/components/AppointmentForm/AppointmentForm.tsx
import type { UseFormReturn } from "react-hook-form";
import css from "./AppointmentForm.module.css";
import TimePicker from "../TimePicker/TimePicker";
import type { FormData } from "../../types/FormData";

interface Props {
  form: UseFormReturn<FormData>;
  onSuccess: () => void; 
}

const AppointmentForm = ({ form, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const submitHandler = (data: FormData) => {
    console.log("Appointment data:", data);

       reset();

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={css.form}
    >
      <div className={css.row}>
        <div className={css.field}>
          <input
            type="text"
            placeholder="Address"
            {...register("address")}
            className={css.input}
          />
          <p className={css.error}>{errors.address?.message}</p>
        </div>

        <div className={css.field}>
          <input
            type="tel"
            placeholder="+380XXXXXXXXX"
            {...register("phone")}
            className={css.input}
          />
          <p className={css.error}>{errors.phone?.message}</p>
        </div>
      </div>

      <div className={css.row}>
        <div className={css.field}>
          <input
            type="number"
            placeholder="Child's age"
            {...register("childAge")}
            className={css.input}
          />
          <p className={css.error}>{errors.childAge?.message}</p>
        </div>

        <div className={css.field}>
          <TimePicker
            value={watch("time") || ""}
            onChange={(val) =>
              setValue("time", val, { shouldValidate: true })
            }
          />
          <p className={css.error}>{errors.time?.message}</p>
        </div>
      </div>

      <div className={css.field}>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={css.parentInput}
        />
        <p className={css.error}>{errors.email?.message}</p>
      </div>

      <div className={css.field}>
        <input
          type="text"
          placeholder="Father's or mother's name"
          {...register("parentName")}
          className={css.parentInput}
        />
        <p className={css.error}>{errors.parentName?.message}</p>
      </div>

      <div className={css.field}>
        <textarea
          placeholder="Comment"
          {...register("comment")}
          className={css.textarea}
        />
        <p className={css.error}>{errors.comment?.message}</p>
      </div>

      <div className={css.buttonWrapper}>
        <button type="submit" className={css.submitBtn}>
          Send
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;