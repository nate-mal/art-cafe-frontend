import React, { useEffect, useContext } from "react";

import useRouter from "next/router";
import Container from "@mui/material/Container";
import RegisterForm from "../../src/components/RegisterPage/RegisterForm";
import { UserContext } from "../../context/user";

function Register() {
  const { user, checkLogin } = useContext(UserContext);
  useEffect(() => {
    checkLogin();
  }, []);
  if (user) {
    useRouter.push("/user");
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <RegisterForm />
    </Container>
  );
}

export default Register;
