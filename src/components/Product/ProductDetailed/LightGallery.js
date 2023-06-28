import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import CartItem from "../../Cart/CartItem";
import ImageKit from "../../../ImageKit";
import Grid from "@mui/material/Grid";
import classes from "./LightGallery.module.css";
export default function Gallery({ pictures }) {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <LightGallery
      elementClassNames={classes["custom_wrapper"]}
      onInit={onInit}
      // speed={500}
      plugins={[lgThumbnail, lgZoom]}
    >
      {pictures.map((item) => {
        const imageKey = item.url.substring(item.url.lastIndexOf("/") + 1);
        return (
          <a
            data-src={`https://ik.imagekit.io/artcafe/tr:h-800/${imageKey}`}
            data-lg-size="400-400"
            // data-with={400}
          >
            <ImageKit
              src={item.url.substring(pictures[0].url.lastIndexOf("/") + 1)}
              alt={item.alt}
              width={50}
              height={50}
            />
          </a>
        );
      })}
    </LightGallery>
  );
}
