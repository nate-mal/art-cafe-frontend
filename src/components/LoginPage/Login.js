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
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Backdrop,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "../../Link";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const background = "/assets/oradea-background.jpg";
const mobileBackground = "/assets/oradea-background-mobile-f.jpg";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import RightArrow from "../ui/RightArrow";
const airplane = "/assets/send.svg";
import React, { useCallback, useEffect, useState, useContext } from "react";
import Image from "next/image";
const lock = "/assets/lock.png";
import { UserContext } from "/context/user";
import GoogleLogin from "./GoogleLogin";

const LoginFormBase = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("XS"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [alert, setAlert] = useState(["", ""]);

  const { setUser, doLogin, loggingIn } = useContext(UserContext);

  const onSubmit = async () => {
    const ret = await doLogin({ identifier: email, password: password });

    if (ret[0] == "alert") {
      setAlert(ret);
    } else {
      setUser(ret.message.username);
    }
  };

  const onChange = useCallback((event) => {
    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }, []);

  const buttonContents = loggingIn ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      Log In
      <LoginIcon />
    </React.Fragment>
  );
  return (
    <>
      <Grid
        container
        direction="row"
        data-aos={matchesMD ? "fade-in" : "fade-right"}
      >
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
              <Typography variant="h4" sx={{ lineHeight: 1 }} align="center">
                Log In
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ lineHeight: 1 }}
                align="center"
                color="red"
              >
                {alert[1] && "Username/email sau parolă greșită"}
              </Typography>
            </Grid>

            <Grid item>
              <Grid item sx={{ marginBottom: ".5em", maxWidth: "25em" }}>
                <TextField
                  variant="standard"
                  label="Username sau email"
                  error={Boolean(alert[1] && !loggingIn)}
                  id="email"
                  style={{ width: "90vw", maxWidth: "25em" }}
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              <Grid
                item
                sx={{
                  marginBottom: ".5em",
                  maxWidth: "25em",
                  marginTop: "1em",
                }}
              >
                <FormControl>
                  <InputLabel style={{ marginLeft: "-1em" }} htmlFor="password">
                    Password
                  </InputLabel>
                  <Input
                    onChange={onChange}
                    style={{ width: "90vw", maxWidth: "25em" }}
                    id="password"
                    error={Boolean(alert[1] && !loggingIn)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              direction="column"
              sx={{ marignLeft: "2em", marginRight: "2em" }}
            >
              <Grid item container justifyContent="center">
                <Button
                  variant="contained"
                  disabled={email.length === 0 || password.length === 0}
                  onClick={() => {
                    onSubmit();
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
              <Grid
                item
                container
                justifyContent="space-around"
                style={{ marginTop: ".8em" }}
              >
                <Link href="/user/forgotpassword">Am uitat parola</Link>
                <Link href="/user/register">Nu am cont (SIGN UP)</Link>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                style={{ marginLeft: "-9px", padding: "1em" }}
              >
                <GoogleLogin />
              </Grid>
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              // sx={{ marignLeft: "2em", marginRight: "2em" }}
            ></Grid>
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
                  "&:hover": {
                    borderColor: "#fff",
                    textDecoration: "underline",
                  },
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loggingIn}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LoginFormBase;
