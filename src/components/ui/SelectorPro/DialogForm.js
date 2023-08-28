import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FilterForm from "./FilterForm";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme, useMediaQuery, Grid } from "@mui/material";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ margin: "1em" }}
      >
        <ChecklistRoundedIcon style={{ marginRight: ".2em" }} /> Selector Pro
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={matchesSM}
        sx={{
          "& .MuiDialog-paper": { backgroundColor: "transparent" },
        }}
      >
        <Grid
          container
          style={{ height: matchesSM && "100vh" }}
          justifyContent="center"
          alignContent="center"
        >
          <Grid
            item
            style={{ marginTop: matchesSM && "-4em", paddingTop: "1em" }}
          >
            <Box
              style={{
                textAlign: "right",
                justifySelft: "right",

                marginBottom: "-3em",
              }}
            >
              <IconButton
                onClick={handleClose}
                style={{
                  height: "1em",
                  marginTop: "1em",
                  marginRight: ".5em",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <FilterForm onSearch={handleClose} />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
