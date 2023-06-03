import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Image from "next/image";
// import { CldImage } from "next-cloudinary";
export default function ReparoCarousel() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
    return `/reparogallery/image-${index + 1}.webp`;
  });

  console.log(images);
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      sx={{ marginBottom: "4em" }}
    >
      <Grid item sx={{ width: "100%", maxWidth: "50em" }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ paddingBottom: "1em" }}
        >
          De prin atelier
        </Typography>
        <Carousel height={matchesSM ? 200 : undefined}>
          {images.map((path, i) => (
            <Item
              key={i}
              path={path}
              name="imagine relevantă pentru ateleriul reparo artcafe, (ex. aparate in service)"
            />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}

function Item({ path, name }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper>
      <Grid container justifyContent="center">
        <Image
          src={path}
          alt={name}
          width={matchesSM ? 250 : 500}
          height={matchesSM ? 250 : 500}
        />
      </Grid>
    </Paper>
  );
}
