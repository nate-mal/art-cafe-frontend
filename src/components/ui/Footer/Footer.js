import * as React from "react";
import { useTheme } from "@emotion/react";
import Grid from "@mui/material/Grid";
import Link from "../../../Link";
import Hidden from "@mui/material/Hidden";
import Lottie from "lottie-react";
import coffeAnimation from "../../../animations/coffeTimeAnimation/data";
import Copyright from "./Copyright";
const Footer = ({ options }) => {
  const lottieRef = React.useRef();
  const defaultTheme = useTheme();
  return (
    <Grid
      item
      container
      component="footer"
      sx={(theme) => {
        return {
          backgroundColor: theme.palette.primary.main,
          zIndex: defaultTheme.zIndex.appBar - 2,
          position: "relative",
          padding: "1em",
        };
      }}
    >
      <Grid
        item
        sx={{
          position: "absolute",
          width: "30%",
          left: "1em",
          bottom: "1.5em",
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={coffeAnimation}
          autoplay={true}
          loop={true}
        />
      </Grid>
      <Hidden mdDown>
        <Grid item container justifyContent="center">
          {options.map((option, index) => {
            const createItem = (name, link) => {
              return (
                <Grid
                  component={Link}
                  href={link}
                  item
                  key={link}
                  sx={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  {name}
                </Grid>
              );
            };
            return (
              <Grid item key={index} sx={{ margin: "3rem" }}>
                <Grid container direction="column" spacing={2}>
                  {option.subs &&
                    option.subs.map((sub) => {
                      return createItem(sub.name, sub.link);
                    })}
                  {!option.subs && createItem(option.name, option.link)}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Hidden>

      <Grid
        item
        container
        spacing={2}
        sx={{
          justifyContent: "flex-end",
          right: "1.5em",
          img: {
            width: "3em",
            height: "3rem",
            [defaultTheme.breakpoints.down("md")]: {
              width: "2rem",
              height: "2rem",
            },
          },
        }}
      >
        <Grid
          item
          component="a"
          href="https://www.facebook.com"
          rel="noopener norefferer"
          target="_blank"
        >
          <img alt="facebook-icon" src="/assets/facebook.svg" />
        </Grid>
        <Grid
          item
          component="a"
          href="https://www.instagram.com"
          rel="noopener norefferer"
          target="_blank"
        >
          <img alt="instagram-icon" src="/assets/instagram.svg" />
        </Grid>
        <Grid
          item
          component="a"
          href="https://www.twitter.com"
          rel="noopener norefferer"
          target="_blank"
        >
          <img alt="twitter-icon" src="/assets/twitter.svg" />
        </Grid>
      </Grid>
      <Grid item>
        <Copyright />
      </Grid>
    </Grid>
  );
};

export default Footer;
