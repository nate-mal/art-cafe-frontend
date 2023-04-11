import React, { useEffect, useContext } from "react";
import useRouter from "next/router";
import { UserContext } from "../../context/user";
import ForgotForm from "../../src/components/LoginPage/ForgotForm";
import Container from "@mui/material/Container";

const forgotpassword = () => {
  const { user, checkLogin } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res.status === 200) {
      }
    })();
  }, []);
  if (user) {
    useRouter.push("/user");
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <ForgotForm />
    </Container>
  );
};

export default forgotpassword;
