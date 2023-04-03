import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export default function PaymentForm({ payment_method, setPaymentMethod }) {
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Metodă de plată
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
                label="Plată online (Livrare gratuită + cupoane de reducere)"
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
