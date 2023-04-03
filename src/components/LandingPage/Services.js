import * as React from "react";
import Link from "../../Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { Button, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Lottie from "lottie-react";
import coffeAnimation from "../../animations/coffeTimeAnimation/data";
import coffeMaker from "../../animations/coffeMaker/data";
import serviceAnimation from "../../animations/serviceAnimation/data";

import RightArrow from "../ui/RightArrow";

const Services = () => {
  const lottieRef = React.useRef();

  const theme = useTheme();
  const defaultTheme = useTheme();
  const matchesSM = useMediaQuery(defaultTheme.breakpoints.down("md"));
  return (
    <Grid
      item
      sx={{
        img: {
          marginLeft: "2em",
          [defaultTheme.breakpoints.down("sm")]: { marginLeft: 0 },
        },
      }}
      data-aos="fade-up"
    >
      {/*-----Piese pentru aparate de cafea automate-----*/}
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent={matchesSM ? "center" : undefined}
          data-aos="fade-up"
        >
          <Grid
            item
            sx={{
              marginLeft: matchesSM ? 0 : "5em",
              textAlign: matchesSM ? "center" : "none",
            }}
          >
            <Typography variant="h4">
              Piese de calitate pentru o cafea perfectă!
            </Typography>{" "}
            <Typography variant="subtitle1" sx={{ marginBottom: "1em" }}>
              Gamă variată de produse pentru toate tipurile de aparte automate
            </Typography>
            <Typography variant="subtitle1">
              Înlocuiește piesele vechi și redescoperă aroma autentică a
              <span
                style={{
                  color: theme.palette.common.orange,
                  fontFamily: "Pacifico",
                }}
              >
                {" "}
                cafelei tale!
              </span>
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              href="/"
              sx={(theme) => ({ ...theme.typography.learnMore })}
            >
              <span style={{ marginRight: 10 }}>Caută o piesă</span>
              <RightArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              marginLeft: "2em",
              marginTop: matchesSM ? "1em" : 0,
              [defaultTheme.breakpoints.down("sm")]: { marginLeft: 0 },
              width: "200px",
            }}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={coffeAnimation}
              autoplay={true}
              loop={true}
            />
          </Grid>
        </Grid>
      </Grid>
      {/*-----Aparate recondiționate Block-----*/}
      <Grid item sx={{ marginTop: "12em" }} data-aos="fade-up">
        <Grid
          container
          direction="row"
          justifyContent={matchesSM ? "center" : "flex-end"}
        >
          <Grid
            item
            sx={{
              textAlign: matchesSM ? "center" : "none",
            }}
          >
            <Typography variant="h4">
              Gustul perfect, la prețul potrivit{" "}
            </Typography>{" "}
            <Typography variant="subtitle1" sx={{ marginBottom: "1em" }}>
              Cafea de calitate, aparate recondiționate cu grijă!
            </Typography>
            <Typography variant="subtitle1">
              Comercializarea aparatelor recondiționate contribuie, de asemenea,
              {matchesSM ? null : <br />}la reducerea deșeurilor și la
              protejarea mediului.
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              href="/products?markMeiId=mark-1&category=157&categoryName=Aparate automate recondiționate"
              sx={(theme) => ({ ...theme.typography.learnMore })}
            >
              <span style={{ marginRight: 10 }}>Află mai multe</span>
              <RightArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              marginLeft: "2em",
              marginTop: matchesSM ? "1em" : 0,
              [defaultTheme.breakpoints.down("sm")]: { marginLeft: 0 },
              width: "200px",
            }}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={coffeMaker}
              autoplay={true}
              loop={true}
            />
          </Grid>
        </Grid>
      </Grid>
      {/*-----Reparo Block-----*/}
      <Grid item sx={{ marginTop: "12em" }} data-aos="fade-up">
        <Grid
          container
          direction="row"
          justifyContent={matchesSM ? "center" : undefined}
        >
          <Grid
            item
            sx={{
              marginLeft: matchesSM ? 0 : "5em",
              textAlign: matchesSM ? "center" : "none",
            }}
          >
            <Typography variant="h4">Reparo (Atelierul)</Typography>{" "}
            <Typography variant="subtitle1" sx={{ marginBottom: "1em" }}>
              Servicii rapide și eficiente pentru o cafea perfectă în fiecare
              dimineață!
            </Typography>
            <Typography variant="subtitle1">
              Revitalizăm aparatul tău de cafea automat, pentru o aromă și o
              funcționare perfectă!
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              href="/reparo"
              sx={(theme) => ({ ...theme.typography.learnMore })}
            >
              <span style={{ marginRight: 10 }}>Află mai multe</span>
              <RightArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              marginLeft: "2em",
              marginTop: matchesSM ? "1em" : 0,
              [defaultTheme.breakpoints.down("sm")]: { marginLeft: 0 },
              width: "200px",
            }}
          >
            <Card>
              <Lottie
                lottieRef={lottieRef}
                animationData={serviceAnimation}
                autoplay={true}
                loop={true}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Services;
