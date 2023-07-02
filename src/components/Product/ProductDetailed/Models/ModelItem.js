import * as React from "react";
import Card from "@mui/material/Card";

// import Link from "../../Link";
import { CardActionArea, Grid, Paper, Typography } from "@mui/material";

export default function ModelItem(props) {
  const { name } = props;

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        padding: "1em",
      }}
    >
      {/* <Link href={`${_meilisearch_id}`}> */}

      <Grid item>
        <Typography variant="h6" component="p">
          {name}
        </Typography>
      </Grid>
      {/* </Link> */}
    </Paper>
  );
}
