import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./AsyncAutocomplete.module.css";
import ImageKit from "../../../ImageKit";
import { Box, Grid } from "@mui/material";
export default function AsyncAutocomplete({
  options,
  loading,
  onSelected,
  value,
  noOptionsText,
  label,
}) {
  const [open, setOpen] = React.useState(false);

  const getImagePathFromUrl = (url) => {
    return url
      ? url.substring(url.lastIndexOf("/") + 1)
      : "Product-Image-Coming-Soon.png";
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
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
          fullWidth
          label={label}
          style={{ width: "80vw", maxWidth: "40em" }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {value.picture && (
                  <ImageKit
                    src={getImagePathFromUrl(value.picture)}
                    alt={value.name}
                    style={{
                      objectFit: "scale-down",
                      fontWeight: "bolder",
                    }}
                    width={50}
                    height={40}
                  />
                )}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          className={classes.autocomplete}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            {option.picture && (
              <ImageKit
                src={getImagePathFromUrl(option.picture)}
                alt={option.name}
                style={{
                  marginRight: 15,
                  objectFit: "scale-down",
                  fontWeight: "bolder",
                }}
                width={50}
                height={40}
              />
            )}
            {option.name}
          </Box>
        </li>
      )}
    />
  );
}
