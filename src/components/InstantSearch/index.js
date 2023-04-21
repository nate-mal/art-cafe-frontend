import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MeiSearch from "./MeiSearch";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import Link from "../../Link";
import { Typography } from "@mui/material";

export default function InstantSearch({ open, onClose }) {
  const [query, setQuery] = React.useState("");
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    onClose();
    setQuery("");
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        fullScreen={matchesSM}
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{ marginTop: query === "" ? "1800px" : "", zIndex: 99999 }}
        PaperProps={{
          sx: {
            minHeight: "95vh",
          },
        }}
      >
        {/* <IconButton
          style={{ alignSelf: "end", marginRight: ".5em", marginTop: ".5em" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton> */}
        {/* <DialogTitle
          id="scroll-dialog-title"
          style={{ textAlign: "center", marginTop: 0, paddingTop: 0 }}
        >
          Caută cu viteza luminii:
          <span style={{ fontSize: "16px" }}>&#128526;</span>
          <div>( denumire produs, categorie, cod piesă, etc...)</div>
        </DialogTitle> */}

        <DialogContent>
          <MeiSearch onHit={handleClose} setQuery={setQuery} query={query} />
          {/* <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
         
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            component={Link}
            onClick={handleClose}
            href={`/products?search=${query}`}
            style={{ marginLeft: "auto" }}
          >
            Caută
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
