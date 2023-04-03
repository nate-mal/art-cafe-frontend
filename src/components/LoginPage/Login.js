import { useTheme } from "@emotion/react";
// import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  TextField,
  Typography,
  Button,
  useMediaQuery,
  Dialog,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "../../Link";
import LoginIcon from "@mui/icons-material/Login";
const background = "/assets/oradea-background.jpg";
const mobileBackground = "/assets/oradea-background-mobile-f.jpg";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import RightArrow from "../ui/RightArrow";
const airplane = "/assets/send.svg";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
const lock = "/assets/lock.png";

const Login = ({ onSubmit }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("XS"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");

  const onChange = useCallback(
    (event) => {
      let valid;
      switch (event.target.id) {
        case "email":
          setEmail(event.target.value);
          if (emailTouched) {
            valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
              event.target.value
            );
            if (!valid) {
              setEmailHelper("Invalid email");
            } else {
              setEmailHelper("");
            }
          }
          break;
        default:
          break;
      }
    },
    [emailTouched]
  );

  useEffect(() => {
    if (emailTouched) onChange(emailTouched);
  }, [emailTouched, onChange]);

  const buttonContents = (
    <React.Fragment>
      Login / Sign up
      <LoginIcon />
    </React.Fragment>
  );
  return (
    <Grid container direction="row" sx={{ marginTop: "-2em" }}>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        // md={4}
        lg={4}
        xl={3}
        sx={{
          marginTop: matchesSM ? "3em" : matchesMD ? "5em" : "3em",
          marginBottom: matchesMD ? "5em" : 0,
        }}
        data-aos={matchesMD ? "fade-up" : "fade-right"}
      >
        <Grid item sx={{ marginBottom: "3em" }}>
          <Image src={lock} alt="lacăt inchis" width={75} height={75} />
        </Grid>
        <Grid item>
          <Grid
            item
            sx={{
              textAlign: matchesMD ? "center" : "inherit",
              marginBottom: "2em",
            }}
          >
            <Typography variant="h4" sx={{ lineHeight: 1 }}>
              Conectare doar prin email
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.blue }}
            >
              login / sign up fără parolă
            </Typography>
          </Grid>
          {/* <Grid item container alignItems="center" sx={{ marginTop: "2em" }}>
            <Grid item>
              <PhoneIcon color="primary" />
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                href="tel:555555555"
                component="a"
                sx={{
                  color: theme.palette.common.blue,
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                (555)-555-555
              </Typography>
            </Grid>
          </Grid> */}
          {/* <Grid container alignItems="center" sx={{ marginBottom: "2em" }}>
            <Grid item>
              <MailIcon color="primary" />
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                component="a"
                href="mailto:malitan.contact@gmail.com"
                sx={{
                  color: theme.palette.common.blue,
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                artcafe@gmail.com
              </Typography>
            </Grid>
          </Grid> */}
          <Grid item>
            <Grid item sx={{ marginBottom: ".5em", maxWidth: "25em" }}>
              <TextField
                variant="standard"
                label="Email"
                id="email"
                style={{ width: "90vw", maxWidth: "25em" }}
                helperText={emailHelper}
                error={emailHelper !== ""}
                value={email}
                onChange={onChange}
                onBlur={setEmailTouched}
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            justifyContent="center"
            sx={{ marignLeft: "2em", marginRight: "2em" }}
          >
            <Grid item>
              <Button
                variant="contained"
                disabled={emailHelper.length !== 0}
                onClick={() => {
                  onSubmit(email);
                }}
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
                  marginTop: "2em",
                }}
              >
                {buttonContents}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        alignItems="center"
        justifyContent={matchesSM ? "center" : "flex-start"}
        // md={8}
        lg={8}
        xl={9}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "60em",
          [theme.breakpoints.down("md")]: {
            backgroundImage: `url(${mobileBackground})`,
          },
        }}
        data-aos="fade-zoom-in"
      >
        <Grid
          item
          container
          sx={{
            color: theme.palette.primary.main,
            textAlign: matchesSM ? "center" : "inherit",
            marginLeft: matchesMD ? 0 : "2em",
          }}
          data-aos="fade-up"
          data-aos-delay="100"
          alignItems="center"
          justifyContent={matchesMD ? "center" : "flex-start"}
        >
          <Grid item>
            <Typography variant="h2" color="#fff">
              Piese de calitate și reparații rapide și profesionale
              <br /> pentru aparatul tău de cafea
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "white" }}>
              Alege cu încredere atelierul nostru local din municipiul Oradea.
            </Typography>

            <Button
              variant="outlined"
              component={Link}
              href="/about"
              sx={(theme) => ({
                ...theme.typography.learnMore,
                height: "45px",
                color: "#fff",
                borderColor: "#fff",
                "&:hover": { borderColor: "#fff", textDecoration: "underline" },
              })}
            >
              <span style={{ marginRight: 5 }}>Vezi detalii</span>
              <RightArrow width={20} height={15} fill="#fff" />
            </Button>
          </Grid>
          <Grid item data-aos="zoom-in">
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
                marginLeft: matchesMD ? 0 : "2em",
                marginTop: "2em",
              }}
            >
              Estimare reparație
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
