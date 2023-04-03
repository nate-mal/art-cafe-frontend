import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useTheme } from "@emotion/react";
import Services from "../src/components/LandingPage/Services";
import CallToAction from "../src/components/ui/CallToAction";
export default function ServicesPage() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography
          variant="h2"
          sx={{
            ...theme.typography.revTitle,
            textAlign: matchesSM ? "center" : "inherit",
            marginLeft: matchesSM ? "none" : "2em",
            marginBottom: "1em",
          }}
        >
          Servicii oferite
        </Typography>
      </Grid>
      <Grid item sx={{ marginBottom: "15em" }}>
        <Services />
      </Grid>
      <Grid item>
        <CallToAction />
      </Grid>
    </Grid>
  );
}
