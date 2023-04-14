import React, { useEffect, useContext } from "react";

import useRouter from "next/router";
import { UserContext } from "../../context/user";

import LoginForm from "../../src/components/LoginPage/Login";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import GoogleLogin from "../../src/components/LoginPage/GoogleLogin";
import FacebookLogin from "../../src/components/LoginPage/FacebookLogin";

function Login() {
  const { user, jwt, setUser, checkLogin } = useContext(UserContext);

  useEffect(() => {
    checkLogin();
  }, []);
  if (user) {
    useRouter.push("/user");
  }
  return <LoginForm />;
}

export default Login;
