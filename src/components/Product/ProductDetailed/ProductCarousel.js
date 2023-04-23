import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Grid, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
export default function ProductCarousel({ art_id, name, imgNr, discount }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const paths = [];
  for (let i = 0; i < +imgNr; i++) {
    paths.push(`/images/${art_id}/image-${i}.jpg`);
  }

  return (
    <Carousel height={matchesSM ? 200 : undefined}>
      {paths.map((item, i) => (
        <Item key={i} path={item} name={name} />
      ))}
    </Carousel>
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
          width={matchesSM ? 200 : 400}
          height={matchesSM ? 200 : 400}
        />
      </Grid>
    </Paper>
  );
}
