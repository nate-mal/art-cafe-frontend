import * as React from "react";

// import Link from "../../Link";
import { Paper, Typography } from "@mui/material";

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
        width: "fit-content",
      }}
    >
      {/* <Link href={`${_meilisearch_id}`}> */}

      <Typography variant="h6" component="p">
        {name}
      </Typography>

      {/* </Link> */}
    </Paper>
  );
}
