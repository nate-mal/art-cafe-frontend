import React, { useState, useContext } from "react";
import { useForm, reset } from "react-hook-form";
import { UserContext } from "/context/user";
import {
  TextField,
  Grid,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function registerForm() {
  const { doRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = {};
  password.current = watch("password", "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(["", ""]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    const ret = await doRegister(values);

    if (ret[0] === "alert") {
      setAlert(ret);
    } else {
      setAlert(ret);
      reset();
    }
    setIsSubmitting(false);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid item data-aos="fade-zoom-in">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ height: "90vh" }}
      >
        <Card
          sx={(theme) => ({
            position: "absolute",
            boxShadow: theme.shadows[20],
            borderRadius: 5,
            padding: "8em",
            [theme.breakpoints.down("md")]: {
              paddingBottom: "8em",
              paddingLeft: 0,
              paddingRight: 0,
              borderRadius: 0,
              width: "100%",
            },
          })}
        >
          <CardContent>
            <Grid
              container
              direction="column"
              sx={{ textAlign: "center" }}
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <Typography
                variant="h2"
                sx={(theme) => ({
                  ...theme.typography.revTitle,
                  textAlign: "center",
                  marginBottom: "1em",
                })}
              >
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} className="w-96">
                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item style={{ marginBottom: "1em" }}>
                    <TextField
                      variant="outlined"
                      label="Username"
                      type="text"
                      error={Boolean(errors.username)}
                      style={{ width: "90vw", maxWidth: "25em" }}
                      {...register("username", {
                        required: "Te rog alege un username",
                      })}
                    />
                    {errors.username && (
                      <Typography variant="body2">
                        {errors.username.message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item style={{ marginBottom: "1em" }}>
                    <TextField
                      variant="outlined"
                      label="Email"
                      error={Boolean(errors.email)}
                      type="email"
                      style={{ width: "90vw", maxWidth: "25em" }}
                      {...register("email", {
                        required: "Email-ul este necesar",
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      placeholder="you@email.com"
                    />
                    {errors.email && (
                      <Typography variant="body2">
                        {errors.email.message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item style={{ marginBottom: "1em" }}>
                    <TextField
                      variant="outlined"
                      label="Parolă"
                      type={showPassword ? "text" : "password"}
                      error={Boolean(errors.password || errors.repeatpassword)}
                      style={{ width: "90vw", maxWidth: "25em" }}
                      {...register("password", {
                        required: "Trebuie să alegi o parolă",
                        minLength: {
                          value: 8,
                          message:
                            "Parola trebuie să aibe cel puțin 8 caractere",
                        },
                      })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.password && (
                      <Typography variant="body2">
                        {errors.password.message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item style={{ marginBottom: "1em" }}>
                    <TextField
                      variant="outlined"
                      label="Confirmă"
                      error={Boolean(errors.repeatpassword)}
                      style={{ width: "90vw", maxWidth: "25em" }}
                      type={showPassword ? "text" : "password"}
                      {...register("repeatpassword", {
                        validate: (value) =>
                          value === password.current || "Parolele nu coincid!",
                      })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.repeatpassword && (
                      <Typography variant="body2">
                        {errors.repeatpassword.message}
                      </Typography>
                    )}
                  </Grid>
                  <Button
                    vairant="outlined"
                    type="submit"
                    className="bg-slate-500 hover:bg-slate-600 rounded-md p-4 text-white text-xl text-bold uppercase disabled:bg-slate-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && "Registering..."}
                    {!isSubmitting && "Register"}
                  </Button>
                </Grid>
                {alert[1]}
              </form>
            </Grid>
          </CardContent>
        </Card>
        <div
          style={{
            backgroundImage: `url(/assets/repeatingBackground.svg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </Grid>
    </Grid>
  );
}

export default registerForm;
