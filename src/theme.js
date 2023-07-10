import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const artBrown = "#6f4a2f";
const artOrange = "#f6a118";
const artGrey = "##454141";
const theme = createTheme({
  palette: {
    common: {
      blue: artBrown,
      orange: artOrange,
      grey: artGrey,
    },
    primary: {
      main: artBrown,
    },
    secondary: {
      main: artOrange,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    revTitle: {
      fontWeight: 300,
      color: `${artBrown}`,
      lineHeight: 1.5,
      textAlign: "center",
      fontSize: "3rem",
    },
    h2: {
      color: artBrown,
      fontWeight: 500,
      fontSize: "2.5rem",
    },

    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: artBrown,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: artBrown,
      fontWeight: 700,
    },
    h6: {
      fontFamily: "Raleway",
      color: artBrown,
      fontWeight: 500,
      lineHeight: 1,
    },
    caption: { color: artGrey, textAlign: "center" },
    subtitle1: { fontSize: "1.25rem", fontWeight: 300, color: artGrey },
    body1: { color: "#000", fontSize: ".8rem", fontWeight: 500 },
    body2: { color: artGrey, fontSize: "1rem" },
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
      color: "#fff",
      opacity: 0.7,
      "&&:hover, &&.Mui-selected": {
        opacity: 1,
      },
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      height: "45px",
      color: "white",
      padding: "1em",
      marginRight: "5px",
    },
    learnMore: {
      fontFamily: "Roboto",
      textTransform: "none",
      borderRadius: "50px",
      marginLeft: "10px",
      marginRight: "15px",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: { root: { color: artBrown, fontSize: "1rem" } },
    },
    MuiInput: {
      styleOverrides: {
        root: { color: artGrey, fontWeight: 300 },
        underline: {
          "&:before": {
            borderBottom: `2px solid ${artBrown}`,
          },
          "&:hover:before": {
            borderBottom: `2px solid ${artBrown} !important`,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        multiline: {
          "&:before": {
            borderBottom: `transparent !important`,
          },

          border: `2px solid ${artBrown} !important`,
        },
      },
    },
  },
});
export default theme;
