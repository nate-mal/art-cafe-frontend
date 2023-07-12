import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, useMediaQuery } from "@mui/material";
export default function AsyncAutocomplete({
  options,
  loading,
  onSelected,
  value,
  noOptionsText,
  label,
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Autocomplete
      id="asynchronous-demo"
      // sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      noOptionsText={noOptionsText}
      value={value}
      onChange={(event, newValue) => {
        if (newValue) {
          onSelected(newValue);
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          sx={{
            paddingTop: "1em",
            paddingBottom: "1em",
            width: matchesSM ? "250px" : "400px",
          }}
        />
      )}
    />
  );
}