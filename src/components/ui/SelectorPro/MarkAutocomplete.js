import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Marks({ value, onSelected }) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onSelected(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Marcă" />}
    />
  );
}
