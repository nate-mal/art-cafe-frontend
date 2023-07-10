import CallToAction from "../src/components/ui/CallToAction";
import AboutUsPage from "../src/components/AboutPage";
import Services from "../src/components/LandingPage/Services";
import Box from "@mui/material/Box";
export default function About() {
  return (
    <Box>
      <AboutUsPage />
      <Services />
      <Box sx={{ marginTop: "5em" }}>
        <CallToAction />
      </Box>
    </Box>
  );
}
