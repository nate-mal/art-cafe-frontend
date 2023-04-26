import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { promo_code } from "../../../../lib/settings";
export default function PaymentForm({ payment_method, setPaymentMethod }) {
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Metodă de plată{" "}
        {payment_method === "online" && (
          <span style={{ fontSize: "1em" }}>&#128526;</span>
        )}
        {payment_method === "online" && (
          <span
            data-aos="zoom-in"
            data-aos-delay="900"
            style={{ fontSize: ".7rem", marginLeft: ".5em" }}
          >
            Încearcă cod{" "}
            <Typography
              variant="span"
              sx={{ border: 1, fontSize: ".9rem", padding: "5px" }}
            >
              {promo_code}
            </Typography>
          </span>
        )}
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Alege metoda de plată potrivită pentru tine:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={payment_method}
              onChange={handleChange}
            >
              <FormControlLabel
                value="online"
                control={<Radio />}
                label="Plată online (cupoane de reducere ->  5-10% discount la toată comanda)"
              />
              <FormControlLabel
                value="cashondelivery"
                control={<Radio />}
                label="Ramburs la livrare"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
