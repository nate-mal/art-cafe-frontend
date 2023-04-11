import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import JudAutocomplete from "./JudAutocomplete.js";
import LocAsyncAutocomplete from "./LocAsyncAutocomplete.js";
export default function AddressForm({
  address,
  dispatchAddress,
  helpers,
  onBlurPhone,
  onBlurEmail,
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalii pentru livrare
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Nume"
            fullWidth
            autoComplete="name"
            variant="standard"
            value={address.name}
            onChange={(event) => dispatchAddress("name", event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            variant="standard"
            type="phone"
            value={address.phone}
            onChange={(event) => dispatchAddress("phone", event.target.value)}
            helperText={helpers.phoneHelper}
            onBlur={onBlurPhone}
            error={helpers.phoneHelper.length !== 0}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={address.email}
            onChange={(event) => dispatchAddress("email", event.target.value)}
            helperText={helpers.emailHelper}
            onBlur={onBlurEmail}
            error={helpers.emailHelper.length !== 0}
          />
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="jud"
            name="jud"
            label="Județ:"
            fullWidth
            value={address.jud}
            onChange={(event) => dispatchAddress("jud", event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="loc"
            name="loc"
            label="Localitate:"
            fullWidth
            autoComplete="shipping address-level"
            variant="standard"
            value={address.loc}
            onChange={(event) => dispatchAddress("loc", event.target.value)}
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <JudAutocomplete
            value={address.jud}
            setValue={(value) => dispatchAddress("jud", value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocAsyncAutocomplete
            jud={address.jud}
            value={address.loc}
            setValue={(value) => dispatchAddress("loc", value)}
            setZip={(value) => dispatchAddress("zip", value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="adr"
            name="adr"
            label="Adresă"
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
            value={address.adr}
            onChange={(event) => dispatchAddress("adr", event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="zip"
            name="zip"
            type="number"
            label="Zip / Cod postal"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={address.zip}
            onChange={(event) => dispatchAddress("zip", event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="country"
            name="country"
            label="Țară"
            value="România"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={address.samePaymentAddres}
                color="secondary"
                name="sameAddress"
                value="yes"
                onChange={(event) =>
                  dispatchAddress("same_payment_address", event.target.checked)
                }
              />
            }
            label="Folosește aceiași adresă pentru facturare"
          />
        </Grid>
        {!address.samePaymentAddres && (
          <Grid item xs={12}>
            <TextField
              required={!address.samePaymentAddres}
              id="payment_adr"
              name="payment_adr"
              label="Adresă de plată:"
              fullWidth
              autoComplete="payment address-line"
              variant="standard"
              value={address.payment_adr}
              onChange={(event) =>
                dispatchAddress("payment_adr", event.target.value)
              }
            />
          </Grid>
        )}
        {!address.samePaymentAddres && (
          <Grid item xs={12}>
            <TextField
              required={!address.samePaymentAddress}
              id="payment_name"
              name="payment_name"
              label="Nume:"
              fullWidth
              autoComplete="payment name"
              variant="standard"
              value={address.payment_name}
              onChange={(event) =>
                dispatchAddress("payment_name", event.target.value)
              }
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
