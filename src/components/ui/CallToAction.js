import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RightArrow from "./RightArrow";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import Link from "../../Link";
// import background from "../../assets/background.jpg";
// import mobileBackground from "../../assets/mobileBackground.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
const CallToAction = () => {
  const theme = useTheme();
  const defaultTheme = useTheme();
  const matchesSM = useMediaQuery(defaultTheme.breakpoints.down("md"));
  return (
    <Grid data-aos="fade-zoom-in" container sx={{ height: "60em" }}>
      <Grid item>
        <Grid
          container
          direction={matchesSM ? "column" : "row"}
          sx={{
            position: "absolute",
            justifyContent: matchesSM ? "center" : "space-around",
            alignItems: "center",
            height: "100%",
            width: "100%",
            textAlign: matchesSM ? "center" : "inherit",
            "& *": { color: "#fff" },
          }}
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Grid item sx={{ color: theme.palette.primary.main }}>
            <Typography
              variant="h2"
              color="white"
              sx={{ textShadow: "1px 1px 2px brown" }}
            >
              Reparații rapide și profesionale
              <br /> pentru aparatul tău de cafea
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "white" }}>
              Alege cu încredere atelierul nostru local din municipiul Oradea.
            </Typography>
            <Grid item>
              <Button
                variant="outlined"
                component={Link}
                href="/reparo"
                sx={(theme) => ({
                  ...theme.typography.learnMore,
                  height: "45px",
                  color: "white",
                  // borderColor: "white",
                  "&&:hover": { borderColor: "#fff" },
                })}
              >
                <span style={{ marginRight: 5 }}>Vezi galerie</span>
                <RightArrow width={20} height={15} fill="#fff" />
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              href="/reparo"
              sx={{
                ...theme.typography.estimate,
                borderRadius: 50,
                hieght: 80,
                width: 205,
                backgroundColor: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                },
                fontsize: "1.5rem",
                marginTop: matchesSM ? "3em" : 0,
              }}
            >
              Estimare gratuită
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundImage: `url("/assets/oradea-background.webp")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          [defaultTheme.breakpoints.down("md")]: {
            backgroundImage: `url("/assets/oradea-background-mobile-f.webp")`,
            backgroundAttachment: "inherit",
          },
        }}
      />
    </Grid>
  );
};
export default CallToAction;
