import Head from "next/head";
import { store } from "../app/store";
import { Provider } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import "styles/global.scss";

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

export default function App(props) {
  const { Component, pageProps } = props;
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
