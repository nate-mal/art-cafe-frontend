import * as React from "react";
import Card from "@mui/material/Card";

import Link from "../../Link";
import { CardActionArea, Grid } from "@mui/material";

import ImageKit from "../../ImageKit";
export default function MartItem(props) {
  const { name, id, _meilisearch_id, picture } = props;

  const image_path =
    picture && picture.url
      ? picture.url.substring(picture.url.lastIndexOf("/") + 1)
      : "Product-Image-Coming-Soon.png";

  return (
    <Card>
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Link href={`${_meilisearch_id}`}>
          {/* <Image
            src={image_path}
            alt={name}
            width={150}
            height={100}
            style={{
              objectFit: "scale-down",
              fontWeight: "bolder",
            }}
          /> */}
          <Grid item>
            <ImageKit
              src={image_path}
              alt={name}
              width={150}
              height={100}
              style={{
                objectFit: "scale-down",
                fontWeight: "bolder",
              }}
            />
          </Grid>
        </Link>
      </CardActionArea>
    </Card>
  );
}
