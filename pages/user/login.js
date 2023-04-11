import React, { useEffect, useContext } from "react";

import useRouter from "next/router";
import { UserContext } from "../../context/user";

import LoginForm from "../../src/components/LoginPage/LoginForm";
import Container from "@mui/material/Container";
import GoogleLogin from "../../src/components/LoginPage/GoogleLogin";

function Login() {
  const { user, jwt, setUser, checkLogin } = useContext(UserContext);

  useEffect(() => {
    checkLogin();
  }, []);
  if (user) {
    useRouter.push("/user");
  }
  return (
    <Container style={{ minHeight: "100vh" }}>
      <LoginForm />
      <GoogleLogin />
    </Container>
  );
}

export default Login;
