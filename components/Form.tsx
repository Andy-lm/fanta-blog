import { ChangeEventHandler, FormEventHandler, ReactChild } from "react";

type Props = {
  fields: {
    label: string;
    inputType: "text" | "password";
    inputValue: string | number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    errors: string[];
  }[];
  onSubmit: FormEventHandler;
  Buttons: ReactChild;
};

const Form: React.FC<Props> = (props) => {
  const { fields, onSubmit, Buttons } = props;
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, index) => {
        return (
          <div key={index}>
            <label>
              {field.label}
              <input
                type={field.inputType}
                value={field.inputValue}
                onChange={field.onChange}
              />
            </label>
            {field.errors?.length > 0 && <div>{field.errors.join(",")}</div>}
          </div>
        );
      })}
      {Buttons}
    </form>
  );
};

export default Form;
