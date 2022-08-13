/// <reference types="next" />
/// <reference types="next/types/global" />


declare module "*.png" {
  const value: string;
  export default value;
}


type FormFields = {
  label: string;
  type: "text" | "password" | "textarea";
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errors: string[];
};
