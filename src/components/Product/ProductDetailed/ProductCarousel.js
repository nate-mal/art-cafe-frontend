import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Grid, useTheme, useMediaQuery } from "@mui/material";
// import Image from "next/image";
import ImageKit from "../../../ImageKit";
export default function ProductCarousel({
  art_id,
  name,
  imgNr,
  discount,
  pictures,
}) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  // const paths = [];
  // for (let i = 0; i < +imgNr; i++) {
  //   paths.push(`/images/${art_id}/image-${i}.jpg`);
  // }

  // console.log(images);
  return (
    <Carousel height={matchesSM ? 200 : undefined}>
      {pictures && pictures.length > 0 ? (
        pictures.map((item, i) => (
          <Item
            key={i}
            path={item.url.substring(pictures[0].url.lastIndexOf("/") + 1)}
            name={name}
          />
        ))
      ) : (
        <Item
          key={i}
          path="Product-Image-Coming-Soon.png"
          name={"nu există imagini pentru acest produs"}
        />
      )}
    </Carousel>
  );
}

function Item({ path, name }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper>
      <Grid container justifyContent="center">
        <ImageKit
          src={path}
          alt={name}
          width={matchesSM ? 200 : 400}
          height={matchesSM ? 200 : 400}
        />
      </Grid>
    </Paper>
  );
}
