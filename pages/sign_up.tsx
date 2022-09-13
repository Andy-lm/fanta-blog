import Axios from "axios";
import useForm from "hooks/useForm";
import styles from "./sign.module.scss";
import Logo from "components/Logo";
import Button from "@material-ui/core/Button";
import { Snackbar } from "@material-ui/core";
import { useState } from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useRouter } from "next/router";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const initFormData = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const { form } = useForm({
    initFormData,
    fields: [
      { label: "用户名", type: "text", key: "username" },
      { label: "密码", type: "password", key: "password" },
      { label: "确认密码", type: "password", key: "passwordConfirmation" },
    ],
    buttons: (
      <div style={{ marginTop: "40px" }}>
        <Button variant="contained" color="primary" size="medium" type="submit">
          注册
        </Button>
      </div>
    ),
    submit: {
      request: (formData) => Axios.post("/api/v1/signUp", formData),
      successCallback: (response) => {
        setOpen(true);
        setTimeout(() => {
          router.push("/sign_in");
        }, 1000);
      },
    },
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.middle}>
        <div className={styles.logo}>
          <Logo size="large" />
        </div>
        <div className={styles.form}>{form}</div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          注册成功！
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
