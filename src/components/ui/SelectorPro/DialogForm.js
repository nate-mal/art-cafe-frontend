import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FilterForm from "./FilterForm";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

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
      <Dialog open={open} onClose={handleClose}>
        <FilterForm onSearch={handleClose} />
      </Dialog>
    </div>
  );
}
