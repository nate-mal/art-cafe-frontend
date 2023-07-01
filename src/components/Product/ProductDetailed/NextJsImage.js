import * as React from "react";
import ImageKit from "../../../ImageKit";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function NextImageMagnifier(props) {
  const {
    src,
    alt,
    width,
    height,
    magnifierHeight = 150,
    magnifieWidth = 150,
    zoomLevel = 1.6,
  } = props;
  const [[x, y], setXY] = React.useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = React.useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = React.useState(false);
  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width,
      }}
    >
      <Grid
        item
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://ik.imagekit.io/artcafe/tr:w-50,h-50/${src.substring(
            src.lastIndexOf("/") + 1
          )})`,
          width: { width },
          // height: "150px",
        }}
      >
        <Box
          style={{
            heigth: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            objectPosition: "bottom",
          }}
        >
          <img
            alt={alt}
            // src={src + 1}
            width={width}
            // height={height}
            style={{ height: height, width: width }}
            onMouseEnter={(e) => {
              // update image size and turn-on magnifier
              const elem = e.currentTarget;
              const { width, height } = elem.getBoundingClientRect();
              setSize([width, height]);
              setShowMagnifier(true);
            }}
            onMouseMove={(e) => {
              // update cursor position
              const elem = e.currentTarget;
              const { top, left } = elem.getBoundingClientRect();

              // calculate cursor position on the image
              const x = e.pageX - left - window.pageXOffset;
              const y = e.pageY - top - window.pageYOffset;
              setXY([x, y]);
            }}
            onMouseLeave={() => {
              // close magnifier
              setShowMagnifier(false);
            }}
            {...props}
          />
        </Box>
      </Grid>

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}
