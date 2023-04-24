import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { CartContextProvider } from "../src/store/cart-context";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Header from "../src/components/ui/Header/Header";
import "aos/dist/aos.css";
import AOS from "aos";
import styles from "../src/styles/global.css";
import Footer from "../src/components/ui/Footer/Footer";
import UserProvider from "../context/user";
import NotificationProvider from "../context/notification";
import DiscountsProvider from "../context/discounts";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Router from "next/router";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const options = useMemo(
    () => [
      { name: "Home", link: "/" },

      {
        name: "Servicii",
        link: "/services",
        subs: [
          { name: "Servicii", link: "/services", index: 1 },
          {
            name: "Piese de schimb pentru aparate de cafea",
            link: "/",
          },
          {
            name: "Aparate de cafea reconditionate",
            link: "/products?markMeiId=mark-1&category=157&categoryName=Aparate automate recondiționate",
          },
          { name: "Reparo (Atelier) pentru aparate de cafea", link: "/reparo" },
        ],
      },

      {
        name: "About Us",
        link: "/",
      },
      {
        name: "Contact Us",
        link: "/contact",
      },
      {
        name: "Piese de schimb",
        link: "/",
        subs: [
          { link: "mark-1", id: 1, name: "Piese  UNIVERSAL" },
          { link: "/mark-2", id: 2, name: "Piese  AEG" },
          { link: "/mark-3", id: 3, name: "Piese  JURA" },
          { link: "/mark-4", id: 4, name: "Piese  KRUPS" },
          { link: "/mark-5", id: 5, name: "Piese  BOSCH" },
          { link: "/mark-6", id: 6, name: "Piese  DELONGHI" },
          { link: "/mark-7", id: 7, name: "Piese  DOLCE GUSTO" },
          { link: "/mark-8", id: 8, name: "Piese  FRANKE" },
          { link: "/mark-9", id: 9, name: "Piese  GAGGENAU" },
          { link: "/mark-10", id: 10, name: "Piese  MELITTA" },
          { link: "/mark-11", id: 11, name: "Piese  MIELE" },
          { link: "/mark-12", id: 12, name: "Piese  NEFF" },
          { link: "/mark-13", id: 13, name: "Piese  NIVONA" },
          { link: "/mark-14", id: 14, name: "Piese  PHILIPS" },
          { link: "/mark-15", id: 15, name: "Piese  SAECO" },
          { link: "/mark-16", id: 16, name: "Piese  SENSEO" },
          { link: "/mark-17", id: 17, name: "Piese  SIEMENS" },
          { link: "/mark-18", id: 18, name: "Piese  GAGGIA" },
          { link: "/mark-19", id: 19, name: "Piese  SCHAERER" },
          { link: "/mark-20", id: 20, name: "Piese  SOLIS" },
          { link: "/mark-21", id: 21, name: "Piese  ROTEL" },
          { link: "/mark-22", id: 22, name: "Piese  ECM" },
          { link: "/mark-23", id: 23, name: "Piese  PROFITEC" },
          { link: "/mark-24", id: 24, name: "Piese  QUICKMILL" },
          { link: "/mark-25", id: 25, name: "Piese  ROCKET" },
          { link: "/mark-26", id: 26, name: "Piese  RANCILIO" },
          { link: "/mark-27", id: 27, name: "Piese  LA PAVONI" },
          { link: "/mark-28", id: 28, name: "Piese  WMF" },
        ],
      },
      { name: "Contul meu", link: "/user" },
    ],
    []
  );
  const estimate = { name: "Reparo", link: "/reparo" };

  const [phone, setPhone] = useState("40749060251");
  const [accountName, setAccountName] = useState("Art Cafe");
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  useEffect(() => {
    if (Router.pathname === "/reparo") {
      setPhone("40749060251");
      setAccountName("Atelierul Art Cafe");
    } else {
      setPhone("40747390307");
      setAccountName("Art Cafe");
    }
    Router.events.on("routeChangeComplete", (url) => {
      if (url === "/reparo") {
        setPhone("40749060251");
        setAccountName("Atelierul Art Cafe");
      } else {
        setPhone("40747390307");
        setAccountName("Art Cafe");
      }
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NotificationProvider>
        <UserProvider>
          <DiscountsProvider>
            <CartContextProvider>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Header options={options} specialOption={estimate} />
                <Component {...pageProps} />
                <Footer options={options} />

                <FloatingWhatsApp
                  phoneNumber={phone}
                  accountName={accountName}
                  avatar="/logo.png"
                  chatMessage="Bună ziua! Cu ce vă pot ajuta?"
                  allowEsc
                  allowClickAway
                  notification
                  notificationSound
                />
              </ThemeProvider>
            </CartContextProvider>
          </DiscountsProvider>
        </UserProvider>
      </NotificationProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
