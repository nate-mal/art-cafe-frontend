import * as React from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
export default function QuantityPicker(props) {
  const min = props.min || 1;
  const max = props.max || 100;
  const { value, setValue } = props;

  return (
    <Card sx={{ borderRadius: "50px" }}>
      <IconButton
        aria-label="decrease quantity by one"
        color="primary"
        onClick={() =>
          setValue((prev) => {
            const newvalue = +prev <= min + 1 ? min : +prev - 1;
            return newvalue;
          })
        }
      >
        <RemoveCircleSharpIcon />
      </IconButton>

      <InputBase
        sx={{
          width: "1.5em",
          input: { textAlign: "center" },
        }}
        value={value}
        onChange={(e) => {
          const newvalue = e.target.value;
          if (isNaN(newvalue) || newvalue <= min) {
            setValue(min);
          } else if (newvalue >= max) {
            setValue(max);
          } else setValue(newvalue);
        }}
      />
      <IconButton
        onClick={() =>
          setValue((prev) => {
            const newvalue = +prev >= max ? max : +prev + 1;
            return newvalue;
          })
        }
        aria-label="increase quantity by one"
        color="primary"
      >
        <AddCircleSharpIcon />
      </IconButton>
    </Card>
  );
}
