import * as React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";

import ImageKit from "../../../ImageKit";

import Lightbox from "yet-another-react-lightbox";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
export default function ProductCarousel({
  art_id,
  name,
  imgNr,
  discount,
  pictures,
}) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid container justifyContent="end">
        <IconButton onClick={() => setOpen(true)}>
          <FullscreenIcon />
        </IconButton>
      </Grid>
      <Carousel height={matchesSM ? 200 : undefined}>
        {pictures && pictures.length > 0 ? (
          pictures.map((item, i) => (
            <Item
              onClick={() => setOpen(true)}
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
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={pictures.map((item) => item.url)}
        render={{
          slide: ({ slide, rect }) => {
            const size = rect.width > 600 ? 600 : rect.width;
            return (
              <ImageKit
                alt={name}
                src={slide.substring(slide.lastIndexOf("/") + 1)}
                width={size}
                height={size}
              />
            );
          },
        }}
      />
    </>
  );
}

function Item({ path, name, onClick = () => {} }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper onClick={onClick}>
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
