import * as React from "react";
import Link from "../../Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import animationData from "../../animations/landinganimation/data";
import { useTheme } from "@emotion/react";
import { Button, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Lottie from "lottie-react";
import Services from "./Services";

import RightArrow from "../ui/RightArrow";
import CallToAction from "../ui/CallToAction";

const LandingPage = () => {
  const theme = useTheme();
  const defaultTheme = useTheme();
  const matchesSM = useMediaQuery(defaultTheme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(defaultTheme.breakpoints.down("sm"));
  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
          data-aos="fade-up"
        >
          {/*-----Hero Section-----*/}
          <Grid sm item sx={{ margin: "2em" }}>
            <Typography
              component="h2"
              sx={(theme) => ({
                ...theme.typography.revTitle,
                marginBottom: "10px",
              })}
            >
              Reparăm, recondiționăm și revitalizăm
              <br /> aroma cafelei tale!
            </Typography>
            <Grid
              container
              justifyContent="center"
              sx={{
                minWidth: "280px",
                marginRight: "2em",
                [defaultTheme.breakpoints.down("sm")]: { marginRight: 0 },
              }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  component={Link}
                  href="/reparo"
                  sx={(theme) => {
                    return {
                      ...theme.typography.estimate,
                      backgroundColor: theme.palette.secondary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.secondary.light,
                      },
                      borderRadius: "50px",
                      marginLeft: "10px",
                      marginRight: "15px",
                      marginBottom: matchesXS ? "15px" : 0,
                      color: "white",
                    };
                  }}
                >
                  Reparo - estimare
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  component={Link}
                  href="/about"
                  sx={(theme) => ({
                    ...theme.typography.learnMore,
                    height: "45px",
                  })}
                >
                  <span style={{ marginRight: "5px" }}>Află mai multe</span>
                  <RightArrow
                    width={20}
                    height={15}
                    fill={theme.palette.primary.main}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sm item>
            <Lottie
              animationData={animationData}
              loop={true}
              height={"100%"}
              width={"100%"}
              rendererSettings={{ perserveAspectRatio: "XMidYMid slice" }}
            ></Lottie>
          </Grid>
        </Grid>
      </Grid>
      {/* The Services Block */}
      <Grid item sx={{ marginTop: "12em" }}>
        <Services />
      </Grid>

      {/* The Reparo Block */}
      <Grid item data-aos="fade-zoom-in">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100em", marginTop: "12em" }}
        >
          <Card
            sx={{
              position: "absolute",
              boxShadow: defaultTheme.shadows[20],
              borderRadius: 5,
              padding: "8em",
              [defaultTheme.breakpoints.down("md")]: {
                paddingTop: "8em",
                paddingBottom: "8em",
                paddingLeft: 0,
                paddingRight: 0,
                borderRadius: 0,
                width: "100%",
              },
            }}
          >
            <CardContent>
              <Grid
                container
                direction="column"
                sx={{ textAlign: "center" }}
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <Grid item>
                  <Typography variant="h3" gutterBottom>
                    Piese de calitate pentru o cafea perfectă!
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Gamă variată de produse pentru toate tipurile de aparate
                    automate.
                  </Typography>
                  <Typography variant="subtitle2">
                    Înlocuiește piesele vechi și redescoperă aroma autentică a
                    cafelei tale.
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
              </Grid>
            </CardContent>
          </Card>
          <div
            style={{
              backgroundImage: `url(/assets/repeatingBackground.svg)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
            }}
          ></div>
        </Grid>
      </Grid>
      {/* Information Block */}
      <Grid item data-aos="face-zoom-in">
        <Grid
          container
          style={{ height: "80em" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            sx={{
              position: "absolute",
              width: "100%",
              textAlign: matchesXS ? "center" : "inherit",
            }}
          >
            <Grid
              container
              direction={matchesXS ? "column" : "row"}
              spacing={matchesXS ? 10 : 0}
            >
              <Grid
                item
                sm
                sx={{ marginLeft: matchesXS ? 0 : matchesSM ? "2em" : "5em" }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ color: "white" }}
                  data-aos={matchesSM ? "fade-up" : "fade-right"}
                >
                  <Typography variant="h2">Despre noi</Typography>
                  <Typography variant="subtitle2">
                    Let's get personal.
                  </Typography>
                  <Grid item>
                    <Button
                      variant="outlined"
                      component={Link}
                      href="/"
                      sx={(theme) => ({
                        ...theme.typography.learnMore,
                        height: "45px",
                        color: "white",
                        borderColor: "white",
                      })}
                    >
                      <span style={{ marginRight: "5px" }}>Learn More</span>
                      <RightArrow width={20} height={15} fill={"white"} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sm
                sx={{
                  marginRight: matchesXS ? 0 : matchesSM ? "2em" : "5em",
                  textAlign: matchesXS ? "center" : "right",
                }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ color: "white" }}
                  data-aos={matchesSM ? "fade-up" : "fade-left"}
                >
                  <Typography variant="h2">Contactează-ne</Typography>
                  <Typography variant="subtitle2">
                    Say hello!
                    <span role="img" aria-label="waving-hand">
                      🙌
                    </span>
                  </Typography>
                  <Grid item>
                    <Button
                      variant="outlined"
                      component={Link}
                      href="/"
                      sx={(theme) => ({
                        ...theme.typography.learnMore,
                        height: "45px",
                        color: "white",
                        borderColor: "white",
                      })}
                    >
                      <span style={{ marginRight: "5px" }}>Learn More</span>
                      <RightArrow width={20} height={15} fill={"white"} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div
            style={{
              backgroundImage: `url("/assets/infoBackground.svg")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
      <CallToAction />
    </Grid>
  );
};
export default LandingPage;
