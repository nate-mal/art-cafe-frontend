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

const background = "/assets/oradea-background.jpg";
const mobileBackground = "/assets/oradea-background-mobile-f.jpg";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import RightArrow from "../ui/RightArrow";
const airplane = "/assets/send.svg";
import React, { useCallback, useEffect, useState } from "react";

const ContactUs = (props) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("XS"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState(props.email ? props.email : "");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ open: false });
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
              setEmailHelper("Email invalid");
            } else {
              setEmailHelper("");
            }
          }
          break;
        case "phone":
          setPhone(event.target.value);
          if (phoneTouched) {
            valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
              event.target.value
            );
            if (!valid) {
              setPhoneHelper("Număr invalid");
            } else {
              setPhoneHelper("");
            }
          }
          break;
        default:
          break;
      }
    },
    [emailTouched, phoneTouched]
  );
  const onConfirm = async () => {
    setLoading(true);
    axios
      .post("/api/email", {
        body: { name, email, phone, message },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setName("");
        setEmail("");
        setEmailTouched(false);
        setPhone("");
        setPhoneTouched(false);
        setMessage("");
        setOpen(false);
        setFeedback({
          open: true,
          severity: "success",
          message: "Mesajul tău a fost trimis cu succes",
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setFeedback({
          open: true,
          severity: "error",
          message: "Ceva nu a mers bine, încercați mai târziu!",
        });
      })
      .finally(() => {
        console.log("request fulfilled");
      });
  };
  useEffect(() => {
    if (emailTouched) onChange(emailTouched);
    if (phoneTouched) onChange(phoneTouched);
  }, [emailTouched, phoneTouched, onChange]);

  const buttonContents = (
    <React.Fragment>
      Trimite mesajul
      <img src={airplane} alt="paper airplane" style={{ marginLeft: "1em" }} />
    </React.Fragment>
  );
  return (
    <Grid
      container
      direction="row"
      data-aos={matchesMD ? "fade-up" : "fade-right"}
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
        <Grid item>
          <Grid item sx={{ textAlign: matchesMD ? "center" : "inherit" }}>
            <Typography variant="h4" sx={{ lineHeight: 1 }}>
              Contactează-ne
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.blue }}
            >
              Așteptăm mesajul tău.
            </Typography>
          </Grid>
          <Grid item container alignItems="center" sx={{ marginTop: "2em" }}>
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
          </Grid>
          <Grid container alignItems="center" sx={{ marginBottom: "2em" }}>
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
          </Grid>
          <Grid item>
            <Grid item sx={{ marginBottom: ".5em", maxWidth: "20em" }}>
              <TextField
                variant="standard"
                label="Nume"
                id="name"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item sx={{ marginBottom: ".5em", maxWidth: "20em" }}>
              <TextField
                variant="standard"
                label="Email"
                id="email"
                helperText={emailHelper}
                error={emailHelper !== ""}
                fullWidth
                value={email}
                onChange={onChange}
                onBlur={setEmailTouched}
              />
            </Grid>
            <Grid item sx={{ marginBottom: ".5em", maxWidth: "20em" }}>
              <TextField
                variant="standard"
                label="Telefon"
                id="phone"
                helperText={phoneHelper}
                fullWidth
                value={phone}
                onChange={onChange}
                onBlur={setPhoneTouched}
                error={phoneHelper.length !== 0}
              />
            </Grid>
          </Grid>
          <Grid
            item
            style={{ width: "100%", maxWidth: "20em", marginTop: "5em" }}
          >
            <TextField
              variant="standard"
              multiline
              fullWidth
              placeholder="Cu ce te putem ajuta?"
              rows={10}
              value={message}
              id={message}
              onChange={(event) => setMessage(event.target.value)}
            />
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
                disabled={
                  name.length === 0 ||
                  message.length === 0 ||
                  emailHelper.length !== 0 ||
                  phoneHelper.length !== 0
                }
                onClick={() => {
                  setOpen(true);
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

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            paddingTop: matchesXS ? "1em" : matchesMD ? "2em" : "5em",
            paddingBottom: matchesXS ? "1em" : matchesMD ? "2em" : "5em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "1em"
              : matchesMD
              ? "5em"
              : matchesLG
              ? "10em"
              : "12em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "1em"
              : matchesMD
              ? "5em"
              : matchesLG
              ? "10em"
              : "12em",
          },
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h4" sx={{ marginBottom: "1em" }}>
              Confirmare mesaj
            </Typography>
          </Grid>
          <Grid item sx={{ marginBottom: ".5em", width: "100%" }}>
            <TextField
              variant="standard"
              label="Name"
              id="name"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item sx={{ marginBottom: ".5em", width: "100%" }}>
            <TextField
              variant="standard"
              label="Email"
              id="email"
              helperText={emailHelper}
              error={emailHelper !== ""}
              fullWidth
              value={email}
              onChange={onChange}
              onBlur={setEmailTouched}
            />
          </Grid>
          <Grid item sx={{ marginBottom: ".5em", width: "100%" }}>
            <TextField
              variant="standard"
              label="Phone"
              id="phone"
              helperText={phoneHelper}
              fullWidth
              value={phone}
              onChange={onChange}
              onBlur={setPhoneTouched}
              error={phoneHelper.length !== 0}
            />
          </Grid>

          <Grid item sx={{ width: "100%", maxWidth: "20em", marginTop: "5em" }}>
            <TextField
              variant="standard"
              multiline
              fullWidth
              rows={10}
              value={message}
              id={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-around"
          sx={{ paddingTop: "2em", paddingBottom: "2em" }}
        >
          <Grid item>
            <Button color="primary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disabled={
                name.length === 0 ||
                message.length === 0 ||
                emailHelper.length !== 0 ||
                phoneHelper.length !== 0 ||
                loading
              }
              onClick={() => {
                onConfirm();
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
              }}
            >
              {loading ? <CircularProgress /> : buttonContents}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      {/* snackbar alet feedbak */}

      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
          severity={feedback.severity}
          sx={{ width: "100%" }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>

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

export default ContactUs;
