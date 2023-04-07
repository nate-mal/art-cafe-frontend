import React, { useState, useEffect, useCallback } from "react";
import Lottie from "lottie-react";
import { cloneDeep } from "lodash";
import axios from "axios";
import { useTheme } from "@emotion/react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "../../Link";
import {
  Dialog,
  DialogContent,
  TextField,
  useMediaQuery,
  Hidden,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";

const check = "/assets/check.svg";
const send = "/assets/send.svg";
const backArrow = "/assets/backArrow.svg";
const forwardArrow = "/assets/forwardArrow.svg";
const backArrowDisabled = "/assets/backArrowDisabled.svg";
const forwardArrowDisabled = "/assets/forwardArrowDisabled.svg";

// clean

const maintenance = "/assets/estimate/maintenance.png";
const clean = "/assets/estimate/cleaning2.png";
const oil = "/assets/estimate/oil.png";
const grinder = "/assets/estimate/grinder.png";
const leak = "/assets/estimate/leak.png";
const temperature = "/assets/estimate/temperature.png";
const steamer = "/assets/estimate/steam.png";
const noisy = "/assets/estimate/noisy.png";
const cream = "/assets/estimate/no-cream.png";
const coffee = "/assets/estimate/coffee.png";
const coffee2 = "/assets/estimate/coffee2.png";
const coffee3 = "/assets/estimate/coffee3.png";
const yes = "/assets/estimate/yes.png";
const yesno = "/assets/estimate/yesno.png";
const no = "/assets/estimate/no.png";
const problem = "/assets/estimate/problem.png";
const automat = "/assets/estimate/automat.png";
const semi_automat = "/assets/estimate/semi-automat.png";
const capsule = "/assets/estimate/capsule.png";

import estimateAnimation from "../../animations/estimateAnimation/data";
const min_cost = 50;
const max_cost = 200;
const defaultQuestions = [
  {
    id: 1,
    title: "Ce tip de aparat aveți?",
    subtitle: null,
    active: true,
    options: [
      {
        id: 1,
        title: "aparat automat",
        subtitle: null,
        icon: automat,
        iconAlt: "aparat de cafea automat",
        selected: false,
        cost: 0,
      },
      {
        id: 2,
        title: "aparat semi-automat",
        subtitle: null,
        icon: semi_automat,
        iconAlt: "aparat semi-automat",
        selected: false,
        cost: 0,
      },
      {
        id: 3,
        title: "aparat cu capsule",
        subtitle: null,
        icon: capsule,
        iconAlt: "aparat de cafea cu capsule",
        selected: false,
        cost: 0,
      },
    ],
  },
];
const softwareQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Ce servicii de mentenanță doriți?",
    subtitle: "Alege unul sau mai multe.",
    options: [
      {
        id: 1,
        title: "ascuțire moară",
        subtitle: null,
        icon: maintenance,
        iconAlt: "service simbol",
        selected: false,
        cost: 100,
      },
      {
        id: 2,
        title: "decalcifiere (curățare)",
        subtitle: null,
        icon: clean,
        iconAlt: "curățare aparat, decalcifiere",
        selected: false,
        cost: 50,
      },
      {
        id: 3,
        title: "reglare, ungere",
        subtitle: null,
        icon: oil,
        iconAlt: "reglare si ungere",
        selected: false,
        cost: 20,
      },
    ],
    active: true,
  },
  {
    id: 3,
    title: "Ce probleme are aparatul d-voastră?",
    subtitle: "Alege unul sau mai multe.",
    options: [
      {
        id: 1,
        title: "nu macină bine",
        subtitle: null,
        icon: grinder,
        iconAlt: "macinător",
        selected: false,
        cost: 100,
      },
      {
        id: 2,
        title: "curge apă în tavă",
        subtitle: null,
        icon: leak,
        iconAlt: "apă",
        selected: false,
        cost: 50,
      },
      {
        id: 3,
        title: "nu încălzește apa",
        subtitle: null,
        icon: temperature,
        iconAlt: "termometru",
        selected: false,
        cost: 100,
      },
    ],
    active: false,
  },
  {
    id: 4,
    title: "Ce probleme are aparatul d-voastră?",
    subtitle: "Alege unul sau mai multe.",
    options: [
      {
        id: 1,
        title: "nu merge steamer-ul",
        subtitle: null,
        icon: steamer,
        iconAlt: "steamer",
        selected: false,
        cost: 100,
      },
      {
        id: 2,
        title: "scoate un zgomot ciudat",
        subtitle: null,
        icon: noisy,
        iconAlt: "zgomot",
        selected: false,
        cost: 100,
      },
      {
        id: 3,
        title: "cafeaua nu are cremă",
        subtitle: null,
        icon: cream,
        iconAlt: "cană de cafea",
        selected: false,
        cost: 50,
      },
      {
        id: 4,
        title: "alte probleme",
        subtitle: null,
        icon: problem,
        iconAlt: "om confuz",
        selected: false,
        cost: 100,
      },
    ],
    active: false,
  },
  {
    id: 5,
    title: "Câte cafele face aparatul d-voastră pe zi?",

    subtitle: "Alege unul.",
    options: [
      {
        id: 1,
        title: "0-10",
        subtitle: "(basic)",
        icon: coffee,
        iconAlt: "o ceașcă de cafea",
        selected: false,
        cost: 0,
      },
      {
        id: 2,
        title: "10-100",
        subtitle: "(business)",
        icon: coffee2,
        iconAlt: "2 cești de cafea",
        selected: false,
        cost: 0,
      },
      {
        id: 3,
        title: "100+",
        subtitle: "peste medie",
        icon: coffee3,
        iconAlt: "3 cești de cafea",
        selected: false,
        cost: 0,
      },
    ],
    active: false,
  },
  {
    id: 6,
    title: "Doriți să ne ocupăm noi de achiziția pieselor?",
    subtitle: "Alege unul.",
    options: [
      {
        id: 1,
        title: "DA, sunt de acord",
        subtitle: null,
        icon: yes,
        iconAlt: "check simbol",
        selected: false,
        cost: 0.8,
      },
      {
        id: 2,
        title: "mă mai gândesc",
        subtitle: null,
        icon: yesno,
        iconAlt: "om nehotărăt",
        selected: false,
        cost: 1,
      },
      {
        id: 3,
        title: "Nu, mă ocup personal",
        subtitle: null,
        icon: no,
        iconAlt: "no simbol",
        selected: false,
        cost: 1,
      },
    ],
    active: false,
  },
];

const websiteQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Ce probleme are aparatul d-voastră?",
    subtitle: "Alege unul sau mai multe",
    options: [
      {
        id: 1,
        title: "Cafeaua nu are cremă",
        subtitle: null,
        icon: cream,
        iconAlt: "cană de cafea",
        selected: false,
        cost: 50,
      },
      {
        id: 2,
        title: "Curge apă în tavă",
        subtitle: null,
        icon: leak,
        iconAlt: "apă",
        selected: false,
        cost: 25,
      },
      {
        id: 3,
        title: "Nu încălzește apa",
        subtitle: null,
        icon: temperature,
        iconAlt: "termometru",
        selected: false,
        cost: 100,
      },
      {
        id: 4,
        title: "Alte probleme",
        subtitle: null,
        icon: problem,
        iconAlt: "om confuz",
        selected: false,
        cost: 100,
      },
    ],
    active: true,
  },
  {
    id: 3,
    title: "Doriți să ne ocupăm noi de achiziția pieselor?",
    subtitle: "Alege unul.",
    options: [
      {
        id: 1,
        title: "DA, sunt de acord",
        subtitle: null,
        icon: yes,
        iconAlt: "check simbol",
        selected: false,
        cost: 0.8,
      },
      {
        id: 2,
        title: "mă mai gândesc",
        subtitle: null,
        icon: yesno,
        iconAlt: "om nehotărăt",
        selected: false,
        cost: 1,
      },
      {
        id: 3,
        title: "Nu, mă ocup personal",
        subtitle: null,
        icon: no,
        iconAlt: "no simbol",
        selected: false,
        cost: 1,
      },
    ],
    active: false,
  },
];

const EstimatePage = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("XS"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const [questions, setQuestions] = useState(defaultQuestions);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [service, setService] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [customFeatures, setCustomFeatures] = useState("");
  const [category, setCategory] = useState("");
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const nextQuestion = () => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;
    const nextIndex = activeIndex + 1;

    newQuestions[activeIndex] = { ...currentlyActive[0], active: false };
    newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true };
    setQuestions(newQuestions);
  };
  const prevQuestion = () => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;
    const prevIndex = activeIndex - 1;

    newQuestions[activeIndex] = { ...currentlyActive[0], active: false };
    newQuestions[prevIndex] = { ...newQuestions[prevIndex], active: true };
    setQuestions(newQuestions);
  };
  const navigationPrevDisabled = () => {
    const currentlyActive = questions.filter((question) => question.active);
    if (currentlyActive[0].id === 1) {
      return true;
    } else {
      return false;
    }
  };
  const navigationNextDisabled = () => {
    const currentlyActive = questions.filter((question) => question.active);
    if (currentlyActive[0].id === questions[questions.length - 1].id) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelect = (id) => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;
    const newSelected = newQuestions[activeIndex].options[id - 1];

    const previousSelected = currentlyActive[0].options.filter(
      (option) => option.selected
    );
    switch (currentlyActive[0].subtitle) {
      case "Alege unul.":
        if (previousSelected[0]) {
          previousSelected[0].selected = !previousSelected[0].selected;
        }
        newSelected.selected = !newSelected.selected;
        break;
      default:
        newSelected.selected = !newSelected.selected;
        break;
    }
    switch (newSelected.title) {
      case "aparat automat":
        setQuestions(softwareQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setUsers("");
        break;
      case "aparat semi-automat":
        setQuestions(softwareQuestions);
        setService(newSelected.title);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setUsers("");
        break;
      case "aparat cu capsule":
        setQuestions(websiteQuestions);
        setService(newSelected.title);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setUsers("");
        break;

      default:
        setQuestions(newQuestions);

        break;
    }
  };
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
        case "phone":
          setPhone(event.target.value);
          if (phoneTouched) {
            valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
              event.target.value
            );
            if (!valid) {
              setPhoneHelper("Invalid phone number");
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
  useEffect(() => {
    if (emailTouched) onChange(emailTouched);
    if (phoneTouched) onChange(phoneTouched);
  }, [emailTouched, phoneTouched, onChange]);

  const getTotal = () => {
    let cost = 0;

    const selections = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length > 0);

    selections.map((options) => options.map((option) => (cost += option.cost)));

    if (cost < min_cost) {
      cost = min_cost;
    } else if (cost > max_cost) {
      cost = cost * 0.7;
    }

    if (questions.length > 2) {
      const userCost = questions
        .filter(
          (question) =>
            question.title === "Doriți să ne ocupăm noi de achiziția pieselor?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0];
      setCustomFeatures(userCost.title);
      cost -= userCost.cost;
      cost *= userCost.cost;
    }
    if (cost < min_cost) {
      cost = min_cost;
    }

    setTotal(Math.ceil(parseInt(cost) / 10) * 10 - 1);
  };
  const getPlatforms = () => {
    let newPlatforms = [];
    if (questions.length > 3) {
      questions
        .filter(
          (question) => question.title === "Ce servicii de mentenanță doriți?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0]
        .map((option) => newPlatforms.push(option.title));
    }
    setPlatforms(newPlatforms);
  };
  const getFeatures = () => {
    let newFeatures = [];
    if (questions.length > 2) {
      questions
        .filter(
          (question) => question.title === "Ce probleme are aparatul d-voastră?"
        )
        .map((question) => question.options.filter((option) => option.selected))
        .map((options) =>
          options.map((option) => newFeatures.push(option.title))
        );
    }
    setFeatures(newFeatures);
  };
  const getUsers = () => {
    if (questions.length > 3) {
      const newCustomFeatures = questions
        .filter(
          (question) =>
            question.title === "Câte cafele face aparatul d-voastră pe zi?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0].title;
      setUsers(newCustomFeatures);
    }
  };
  const softwareSelection = (
    <>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: "1.25em" }}
      >
        <Grid
          item
          container
          justifyContent="start"
          xs={2}
          sx={{ paddingRight: "1em" }}
        >
          {service.toLowerCase().includes("capsule") ? (
            <img
              style={{ width: "4em" }}
              src={capsule}
              alt="aparat cu capsule"
            />
          ) : service.toLowerCase().includes("semi") ? (
            <img
              style={{ width: "4em" }}
              src={semi_automat}
              alt="aparat de cafea semi-automat"
            />
          ) : (
            <img
              style={{ width: "4em" }}
              src={automat}
              alt="aparat de cafea automat"
            />
          )}
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">Aveți un {service}</Typography>
        </Grid>
      </Grid>

      {features && features.length > 0 ? (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: "1.25em" }}
        >
          <Grid item xs={2} sx={{ paddingRight: "1em" }}>
            <img
              style={{ width: "4em" }}
              src={problem}
              alt="semnul exclamării, necesită atenție, obiect nefunctional"
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">
              Probleme: <br />
              {/* if we have features... */}
              {features.length > 0
                ? //...and there's only 1...
                  features.length === 1
                  ? //then end the sentence here
                    `${features[0]}.`
                  : //otherwise, if there are two features...
                  features.length === 2
                  ? //...then end the sentence here
                    `${features[0]} și ${features[1]}.`
                  : //otherwise, if there are three or more features...
                    features
                      //filter out the very last feature...
                      .filter((feature, index) => index !== features.length - 1)
                      //and for those features return their name...
                      .map((feature, index) => (
                        <span key={index}>{`${feature}, `}</span>
                      ))
                : null}
              {features.length > 2
                ? //...and then finally add the last feature with 'and' in front of it
                  ` și ${features[features.length - 1]}.`
                : null}
            </Typography>
          </Grid>
        </Grid>
      ) : null}
      {platforms && platforms.length > 0 ? (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: "1.25em" }}
        >
          <Grid item xs={2} sx={{ paddingRight: "1em" }}>
            <img
              style={{ width: "4em" }}
              src={maintenance}
              alt="o cheie si un obiect rotund"
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">
              Mentenanță: <br />
              {/* if we have platforms... */}
              {platforms.length > 0
                ? //...and there's only 1...
                  platforms.length === 1
                  ? //then end the sentence here
                    `${platforms[0]}.`
                  : //otherwise, if there are two platforms...
                  platforms.length === 2
                  ? //...then end the sentence here
                    `${platforms[0]} și ${platforms[1]}.`
                  : //otherwise, if there are three or more platforms...
                    platforms
                      //filter out the very last feature...
                      .filter(
                        (feature, index) => index !== platforms.length - 1
                      )
                      //and for those platforms return their name...
                      .map((feature, index) => (
                        <span key={index}>{`${feature}, `}</span>
                      ))
                : null}
              {platforms.length > 2
                ? //...and then finally add the last feature with 'and' in front of it
                  ` și ${platforms[platforms.length - 1]}.`
                : null}
            </Typography>
          </Grid>
        </Grid>
      ) : null}

      <Grid item container alignItems="center" sx={{ marginBottom: "1.25em" }}>
        <Grid item xs={2}>
          <img src={check} alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            {customFeatures.toLowerCase().includes("da") &&
              "Dorești să ne ocupăm noi de achiziționarea pieselor"}
            {customFeatures.toLowerCase().includes("nu") &&
              "D-voastră veți procura piesele de schimb."}
            {customFeatures.toLowerCase().includes("gândesc") &&
              "Nu sunteți hotărât încă în legătură cu achiziționarea pieselor."}
          </Typography>
        </Grid>
      </Grid>
    </>
  );

  const sendEstimate = () => {
    setLoading(true);
    axios
      .get("https://us-central1-nat-development.cloudfunctions.net/sendMail", {
        params: {
          name,
          email,
          phone,
          message,
          total,
          category,
          service,
          platforms,
          features,
          customFeatures,
          users,
        },
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
        setQuestions(defaultQuestions);
        setService("");
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setUsers("");
        setDialogOpen(false);
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
  const estimateDisabled = () => {
    let disabled = true;
    const emptySelection = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length === 0);

    if (questions.length === 2) {
      if (emptySelection.length === 1) {
        disabled = false;
      }
    } else if (questions.length === 1) {
      disabled = true;
    } else if (
      emptySelection.length < 4 &&
      questions[questions.length - 1].options.filter(
        (option) => option.selected
      ).length > 0
    ) {
      disabled = false;
    }
    return disabled;
  };

  const getMessage = () => {
    return `Bună ziua! Am un ${service}.${
      features.length > 0 ? " Am următoarele probleme:" : ""
    } 
  ${
    features.length > 0
      ? //...and there's only 1...
        features.length === 1
        ? //then end the sentence here
          `${features[0]}.`
        : //otherwise, if there are two features...
        features.length === 2
        ? //...then end the sentence here
          `${features[0]} și ${features[1]}.`
        : //otherwise, if there are three or more features...
          features
            //filter out the very last feature...
            .filter((feature, index) => index !== features.length - 1)
            //and for those features return their name...
            .map((feature, index) => ` ${feature}`)
      : ""
  } ${
      features.length > 2
        ? //...and then finally add the last feature with 'and' in front of it
          ` și ${features[features.length - 1]}.`
        : ""
    } ${platforms.length > 0 ? "Vreau servicii de mentenanță:" : ""} 
    ${
      platforms.length > 0
        ? //...and there's only 1...
          platforms.length === 1
          ? //then end the sentence here
            `${platforms[0]}.`
          : //otherwise, if there are two platforms...
          platforms.length === 2
          ? //...then end the sentence here
            `${platforms[0]} și ${platforms[1]}.`
          : //otherwise, if there are three or more platforms...
            platforms
              //filter out the very last feature...
              .filter((feature, index) => index !== platforms.length - 1)
              //and for those platforms return their name...
              .map((feature, index) => ` ${feature}`)
        : ""
    }
  ${
    platforms.length > 2
      ? //...and then finally add the last feature with 'and' in front of it
        ` și ${platforms[platforms.length - 1]}.`
      : ""
  } ${
      customFeatures.toLowerCase().includes("da")
        ? "Sunt de acord să vă ocupați voi de achiziționarea pieselor."
        : customFeatures.toLowerCase().includes("nu")
        ? "Mă voi ocupa personal de procurarea piesele de schimb."
        : customFeatures.toLowerCase().includes("gândesc")
        ? "Nu sunt hotărât încă în legătură cu achiziționarea pieselor."
        : ""
    } Mulțumesc!`;
  };

  return (
    <Grid container jdirection="row">
      <Grid
        item
        container
        direction="column"
        lg
        alignItems={matchesMD ? "center" : undefined}
      >
        <Grid item sx={{ marginTop: "2em", marginLeft: matchesMD ? 0 : "5em" }}>
          <Typography variant="h2" align={matchesLG ? "center" : undefined}>
            Estimare cost
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            marginRight: matchesLG ? 0 : "10em",
            maxWidth: "50em",
            // marginTop: "2.5em",
          }}
        >
          <Lottie
            animationData={estimateAnimation}
            loop={true}
            rendererSettings={{ perserveAspectRatio: "XMidYMid slice" }}
            style={{ height: "100%", width: "100%" }}
          ></Lottie>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        lg
        sx={{
          marginRight: matchesLG ? 0 : "2em",

          marginBottom: "5em",
        }}
      >
        {questions
          .filter((question) => question.active)
          .map((question, index) => (
            <Box
              key={index}
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="100"
              data-aos-offset="0"
            >
              <Grid item>
                <Typography
                  variant="h2"
                  align="center"
                  sx={{
                    fontWeight: 300,
                    fontSize: "2.5rem",
                    // marginBottom: "1.5em",
                    marginTop: matchesMD ? "" : "3em",
                    // lineHeight: 1.25,
                  }}
                  gutterBottom
                >
                  {question.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  // sx={{ marginBottom: "1.5em" }}
                  gutterBottom
                >
                  {question.subtitle}
                </Typography>
              </Grid>
              <Grid
                item
                container
                sx={{
                  img: {
                    width: matchesMD ? "5em" : "14em",
                    height: matchesMD ? "5em" : "14em",
                  },
                }}
              >
                {question.options.map((option) => (
                  <Grid
                    key={option.id}
                    item
                    container
                    direction={matchesMD ? "row-reverse" : "column"}
                    alignItems="center"
                    justifyContent="space-evenly"
                    component={Button}
                    onClick={() => handleSelect(option.id)}
                    md
                    sx={{
                      backgroundColor: option.selected
                        ? theme.palette.secondary.main
                        : null,
                      borderRadius: 0,
                      marginBottom: matchesSM ? "1.5em" : 0,
                      "&:hover": {
                        backgroundColor: option.selected
                          ? theme.palette.secondary.main
                          : null,
                      },
                    }}
                  >
                    <Grid item sx={{ maxWidth: "12em" }}>
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{ marginBottom: "1em", fontSize: "1rem" }}
                      >
                        {option.title}
                      </Typography>
                      <Typography variant="caption" align="center">
                        {option.subtitle}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={{ marginRight: matchesMD ? "1em" : undefined }}
                    >
                      <img src={option.icon} alt={option.iconAlt} />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

        <Grid
          item
          container
          justifyContent="space-between"
          sx={{ width: "18em", marginTop: "1em" }}
        >
          <Grid item>
            <IconButton
              disabled={navigationPrevDisabled()}
              onClick={prevQuestion}
            >
              <img
                src={navigationPrevDisabled() ? backArrowDisabled : backArrow}
                alt="Previous question"
              ></img>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disabled={navigationNextDisabled()}
              onClick={nextQuestion}
            >
              <img
                src={
                  navigationNextDisabled() ? forwardArrowDisabled : forwardArrow
                }
                alt="Next question"
              ></img>
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              ...theme.typography.estimate,
              borderRadius: 50,
              backgroundColor: theme.palette.common.orange,
              height: 50,
              width: 225,
              fontSize: "1.25rem",
              marginTop: "2em",
              "&:hover": { backgroundColor: theme.palette.secondary.light },
            }}
            disabled={estimateDisabled()}
            onClick={() => {
              setDialogOpen(true);
              // total
              getTotal();
              // mentenată
              getPlatforms();
              // probleme
              getFeatures();
              // users
              getUsers();
              //   getCustomFeatures();
              //   getCategory();
            }}
          >
            Estimare cost
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="lg"
        fullScreen={matchesSM}
      >
        <Grid item>
          <Grid item align="right" style={{ padding: "1em" }}>
            <IconButton onClick={() => setDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item sx={{ marginTop: "1em", marginBottom: "1em" }}>
            <Typography variant="h2" align="center">
              Estimare cost
            </Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid container justifyContent="space-around" flexWrap="wrap-reverse">
            <Grid
              item
              container
              direction="column"
              md={7}
              style={{ maxWidth: "20em" }}
            >
              {matchesMD && (
                <Grid item style={{ marginTop: "2em" }}>
                  <Typography variant="body2" align="center">
                    sau
                  </Typography>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ marginTop: "1em" }}
                  >
                    Trimite pe Email
                  </Typography>
                </Grid>
              )}
              <Grid item sx={{ marginBottom: ".5em", width: "100%" }}>
                <TextField
                  variant="standard"
                  label="Nume"
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

              <Grid
                item
                sx={{
                  width: "100%",
                  maxWidth: "20em",
                  marginTop: "3em",
                  marginBottom: "2em",
                }}
              >
                <TextField
                  variant="standard"
                  multiline
                  fullWidth
                  placeholder="Menționați mai multe detalii"
                  rows={10}
                  value={message}
                  id={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justifyContent={matchesMD ? "space-around" : undefined}
                sx={{ marginTop: "5em" }}
              >
                {matchesMD && (
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      ...theme.typography.estimate,
                      borderRadius: 50,
                      backgroundColor: theme.palette.common.orange,
                      height: 50,
                      width: 225,
                      fontSize: "1.25rem",

                      "&:hover": {
                        backgroundColor: theme.palette.secondary.light,
                      },
                    }}
                    onClick={() => sendEstimate()}
                    disabled={
                      name.length === 0 ||
                      message.length === 0 ||
                      emailHelper.length !== 0 ||
                      phoneHelper.length !== 0
                    }
                  >
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        Trimite
                        <img
                          src={send}
                          alt="paper airplane"
                          style={{ marginLeft: "0.5em" }}
                        />
                      </>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              md={5}
              style={{ maxWidth: "30em" }}
              alignItems="center"
            >
              {softwareSelection}

              <Grid item>
                <Typography variant="body1" paragraph>
                  Estimăm costul serviciilor la
                  <span
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: theme.palette.common.orange,
                      lineHeight: 1.25,
                      marginLeft: "5px",
                    }}
                  >
                    {total.toFixed(2)} lei
                  </span>
                </Typography>
                <Typography varinat="body1" paragraph>
                  Completați-vă datele de contact și plasați cererea pe email
                  sau trimiteți acum pe whatsapp și vă vom contacta în
                  continuare cu detalii. Prețul final va fi stabilit în urma
                  consultării aparatului la sediul nostru din mun.
                  <span
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: theme.palette.common.orange,
                      lineHeight: 1.25,
                      marginLeft: ".3em",
                    }}
                  >
                    Oradea
                  </span>
                  . Consultarea este
                  <span
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: theme.palette.common.orange,
                      lineHeight: 1.25,
                      marginLeft: ".3em",
                    }}
                  >
                    gratuită
                  </span>
                  .
                </Typography>
              </Grid>
              <Button
                variant="contained"
                sx={{
                  ...theme.typography.estimate,
                  borderRadius: 50,
                  backgroundColor: theme.palette.primary.main,
                  height: 50,
                  width: "fit-content",
                  fontSize: "1.25rem",
                  marginTop: "1.5em",

                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
                href={`https://api.whatsapp.com/send/?phone=40749060251&text=${getMessage()}`}
                component={Link}
                target="_blank"
              >
                <WhatsAppIcon style={{ marginRight: ".5em" }} />
                <p> Trimite pe whatsapp</p>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
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
    </Grid>
  );
};

export default EstimatePage;
