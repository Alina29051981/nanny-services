import type { UseFormReturn } from "react-hook-form";
import css from "./AppointmentForm.module.css";
import TimePicker from "../TimePicker/TimePicker";
import type { FormData } from "../../types/FormData";

interface Props {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
}

const AppointmentForm = ({ form, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css.form}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;

        const target = e.target as HTMLElement;

        // textarea не чіпаємо
        if (target.tagName === "TEXTAREA") return;

        // кнопка — дозволяємо submit
        if (target.tagName === "BUTTON") return;

        e.preventDefault();

        const formElement = e.currentTarget;

        const fields = Array.from(
          formElement.querySelectorAll(
            'input:not([type="hidden"]), textarea'
          )
        ) as HTMLElement[];

        const index = fields.indexOf(target);

        if (index > -1 && index < fields.length - 1) {
          fields[index + 1].focus();
        } else {
          target.blur();
        }
      }}
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
            onChange={(val) => setValue("time", val)}
          />
          <p className={css.error}>{errors.time?.message}</p>
        </div>
      </div>

      <div className={css.field}>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={css.input}
        />
        <p className={css.error}>{errors.email?.message}</p>
      </div>

      <div className={css.field}>
        <input
          type="text"
          placeholder="Father's or mother's name"
          {...register("parentName")}
          className={css.input}
        />
        <p className={css.error}>{errors.parentName?.message}</p>
      </div>

      <div className={css.field}>
        <textarea
          placeholder="Comment"
          {...register("comment")}
          className={css.textarea}
        />
      </div>

      <button type="submit" className={css.submitBtn}>
        Send
      </button>
    </form>
  );
};

export default AppointmentForm;