import * as React from "react";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

export default function ExpandSearch({ onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      color="secondary"
      style={{
        marginLeft: "1em",
        marginRight: "1em",
        paddingLeft: "1em",
        paddingRight: "1em",
        textTransform: "none",
      }}
    >
      <SearchIcon />
      <Typography variant="p" color="secondary" style={{ marginRight: "1em" }}>
        Caută
      </Typography>
    </Button>
  );
}
