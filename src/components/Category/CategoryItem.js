import * as React from "react";
import Card from "@mui/material/Card";

import Link from "../../Link";
import { CardActionArea, Typography, Grid, Box } from "@mui/material";
// import Image from "next/image";
import ImageKit from "../../ImageKit";

export default function MartItem(props) {
  const {
    id,
    markMeiId,
    ex_art_id,
    ex_thumbnail_url,
    name,
    estimatedTotalHits,
  } = props;

  // const image_path = `/images/${ex_art_id}/image-0.jpg`;
  var image_path = ex_thumbnail_url
    ? ex_thumbnail_url.substring(ex_thumbnail_url.lastIndexOf("/") + 1)
    : "Product-Image-Coming-Soon.png";
  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",

        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
          lineHeight: "100px",
        }}
      >
        <Link
          href={{
            pathname: "/products",
            query: { markMeiId: markMeiId, category: id, categoryName: name },
          }}
          sx={{ textDecoration: "none", color: "#000" }}
        >
          <Grid container direction="column" alignItems="center">
            {/* <Image
              src={image_path}
              alt={name}
              width={200}
              height={100}
              style={{ objectFit: "scale-down", fontWeight: "bolder" }}
            /> */}
            <Grid
              item
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(https://ik.imagekit.io/artcafe/tr:w-15,h-15/${image_path})`,
                width: "150px",
                height: "150px",
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
                <ImageKit
                  src={image_path}
                  alt={name}
                  width={150}
                  height={150}
                />
              </Box>
            </Grid>
            <Typography variant="h6" component="h6">
              {name}
            </Typography>
            <Typography variant="body2" component="div">
              Produse: {estimatedTotalHits}
            </Typography>
          </Grid>
        </Link>
      </CardActionArea>
    </Card>
  );
}
