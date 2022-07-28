import { FormEventHandler, ReactChild } from "react";

type Props = {
  fields: FormFields[];
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
              {field.type === "textarea" ? (
                <textarea onChange={field.onChange} value={field.value} />
              ) : (
                <input
                  type={field.type}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
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
