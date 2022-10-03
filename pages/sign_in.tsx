import React from "react";
import Axios from "axios";
import useForm from "hooks/useForm";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { User } from "src/entity/User";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import queryString from "query-string";
import styles from "./sign.module.scss";
import Logo from "components/Logo";
import Button from "@material-ui/core/Button";
import Link from "next/link";


type Props = {
  user: User | null;
};

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const SignIn: NextPage<Props> = (props) => {
  const { user } = props;
  const [currentUser, setCurrentUser] = useState(user);
  const [open, setOpen] = useState(false);
  const { form } = useForm({
    initFormData: {
      username: "",
      password: "",
    },
    fields: [
      {
        label: "用户名",
        type: "text",
        key: "username",
      },
      {
        label: "密码",
        type: "password",
        key: "password",
      },
    ],
    submit: {
      request: (formData) => Axios.post("/api/v1/signIn", formData),
      successCallback: (response) => {
        setOpen(true);
        // 延时一秒展示toast
        setTimeout(() => {
          const search = queryString.parse(window.location.search);
          const returnTo = search["return_to"]?.toString();
          if (returnTo) {
            window.location.href = returnTo;
          } else {
            window.location.href = "/posts";
          }
        }, 1000);
      },
    },
    buttons: (
      <div style={{ marginTop: "50px" }}>
        <Button variant="contained" color="primary" size="medium" type="submit">
          登录
        </Button>
      </div>
    ),
  });

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

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
          <Logo size="large"></Logo>
        </div>
        <div className={styles.form}>{form}</div>
        <div className={styles.tips}>
          <Link href="/sign_up">
            <a>没有账号？注册一个</a>
          </Link>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          登录成功！
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get("currentUser") || "";
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }
);