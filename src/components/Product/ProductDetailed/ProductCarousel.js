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

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Share from "yet-another-react-lightbox/plugins/share";
import Download from "yet-another-react-lightbox/plugins/download";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NextImageMagnifier from "./NextJsImage";
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
        plugins={[Thumbnails, Counter, Share, Download]}
        closeOnBackdropClick={true}
        close={() => setOpen(false)}
        slides={pictures.map((item) => ({
          src: item.url,
          share: { src: item.url, title: name },
          download: `${item.url}?download`,
        }))}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .9)" },
        }}
        render={{
          slide: ({ slide, rect }) => {
            const size = rect.width > 600 ? 600 : rect.width;

            return (
              <NextImageMagnifier
                alt={name}
                // src={slide.src.substring(slide.src.lastIndexOf("/") + 1)}
                src={slide.src}
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
