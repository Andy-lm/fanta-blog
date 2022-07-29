import { FormEventHandler, ReactChild, useCallback, useState } from "react";

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  onSubmit: (formData: T) => void;
  buttons: ReactChild;
};

type Field<T> = {
  label: string;
  type: "text" | "password" | "textarea";
  key: keyof T;
};

// 这里用泛型的目的是每个组件接收的initFormData的类型都是不一样的
function useForm<T>(options: useFormOptions<T>) {
  const { initFormData, fields, onSubmit, buttons } = options;
  const [formData, setFormData] = useState({
    ...initFormData,
  });
  const [errors, setErrors] = useState(() => {
    const obj: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        obj[key] = [];
      }
    }
    return obj;
  });

  /**
   * 处理表单数据变动
   */
  const onChange = useCallback(
    (type, e) => {
      setFormData({ ...formData, [type]: e.target.value });
    },
    [formData]
  );

  const _onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map((field) => {
        return (
          <div key={field.key.toString()}>
            <label>
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  onChange={(e) => {
                    onChange(field.key, e);
                  }}
                  value={formData[field.key].toString()}
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.key].toString()}
                  onChange={(e) => {
                    onChange(field.key, e);
                  }}
                />
              )}
            </label>
            {errors[field.key]?.length > 0 && (
              <div>{errors[field.key].join(",")}</div>
            )}
          </div>
        );
      })}
      {buttons}
    </form>
  );
  return { form, setErrors };
}

export default useForm;
