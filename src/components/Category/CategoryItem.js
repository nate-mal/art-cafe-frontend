import * as React from "react";
import Card from "@mui/material/Card";

import Link from "../../Link";
import { CardActionArea, Typography, Grid } from "@mui/material";
import Image from "next/image";

export default function MartItem(props) {
  const { id, markMeiId, ex_art_id, name, estimatedTotalHits } = props;

  const image_path = `/images/${ex_art_id}/image-0.jpg`;
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
            <Image
              src={image_path}
              alt={name}
              width={200}
              height={100}
              style={{ objectFit: "scale-down", fontWeight: "bolder" }}
            />
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
