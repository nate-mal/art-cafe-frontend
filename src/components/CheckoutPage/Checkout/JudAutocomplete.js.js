import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = [
  "Alba",

  "Arad",

  "Argeș",

  "Sibiu",

  "Bihor",

  "Bistrița-Năsăud",

  "Botoșani",

  "Brașov",

  "Brăila",

  "București",

  "Buzău",

  "Caraș-Severin",

  "Călărași",

  "Cluj",

  "Constanța",

  "Covasna",

  "Dâmbovița",

  "Dolj",

  "Galați",

  "Giurgiu",

  "Gorj",

  "Harghita",

  "Hunedoara",

  "Ialomița",

  "Iași",

  "Ilfov",

  "Maramureș",

  "Mehedinți",

  "Mureș",

  "Neamț",

  "Olt",

  "Prahova",

  "Satu Mare",

  "Sălaj",

  "Bacău",

  "Suceava",

  "Teleorman",

  "Timiș",

  "Tulcea",

  "Vaslui",

  "Vâlcea",

  "Vrancea",
];

export default function Juds({ value, setValue }) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Județ" />}
    />
  );
}
