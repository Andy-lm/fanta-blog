import { AxiosResponse } from "axios";
import { FormEventHandler, ReactChild, useCallback, useState } from "react";
import styles from "./useForm.module.scss";
import TextField from "@material-ui/core/TextField";

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  submit: {
    request: (formData: T) => Promise<AxiosResponse>;
    successCallback?: (response: AxiosResponse) => void;
  };
  buttons: ReactChild;
};

type Field<T> = {
  label: string;
  type: "text" | "password" | "textarea";
  key: keyof T;
};

// 这里用泛型的目的是每个组件接收的initFormData的类型都是不一样的
function useForm<T>(options: useFormOptions<T>) {
  const { initFormData, fields, buttons, submit } = options;
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

  const _onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      setErrors(() => {
        const obj: { [k in keyof T]?: string[] } = {};
        for (let key in initFormData) {
          if (initFormData.hasOwnProperty(key)) {
            obj[key] = [];
          }
        }
        return obj;
      });
      submit.request(formData).then(
        (response) => {
          submit.successCallback(response);
        },
        (error) => {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            console.log("response.data");
            console.log(response.data);
            setErrors({ ...response.data });
          } else if (response.status === 401) {
            window.alert("请先登录！");
            window.location.href = `/sign_in?return_to=${encodeURIComponent(
              window.location.pathname
            )}`;
          }
        }
      );
    },
    [formData]
  );

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map((field) => {
        return (
          <div className={styles.from_item} key={field.key.toString()}>
            <TextField
              error={errors[field.key]?.length > 0 ? true : false}
              id={field.label}
              label={field.label}
              value={formData[field.key].toString()}
              onChange={(e) => {
                onChange(field.key, e);
              }}
              // variant="outlined"
              size="small"
              helperText={errors[field.key].join(",")}
            ></TextField>
          </div>
        );
      })}
      {buttons}
    </form>
  );
  return { form, setErrors };
}
export default useForm;
