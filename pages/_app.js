import { useEffect } from "react";
import Head from "next/head";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { store } from "../app/store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "styles/global.scss";
import "styles/markdown.scss";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        light: "#59ec9a",
        main: "#00b96b",
        dark: "#00883f",
        contrastText: "#ffffff",
      },
    },
    typography: {
      button: {
        fontWeight: 400,
      },
    },
  })
);

const LoginPermissionsUrl = [/posts\/new/, /posts\/\S+\/edit/];

export default function App(props) {
  const router = useRouter();
  const { Component, pageProps } = props;
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isLoggedIn;

  // 建立一个路由拦截器，拦截非登录状态不允许访问的路由跳转
  const handleRouteChange = (url) => {
    let res = LoginPermissionsUrl.find((exp) => {
      return exp.test(url);
    });
    if (!isLoggedIn && res) {
      window.location.href = "/sign_in";
    }
  };
  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [userData]);

  return (
    <>
      <Head>
        <title>我的博客 - Andy</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
