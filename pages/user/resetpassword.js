import React, { useEffect, useContext } from "react";
import useRouter from "next/router";
import Container from "@mui/material/Container";
import { UserContext } from "../../context/user";
import ResetForm from "../../src/components/LoginPage/ResetForm";

const resetpassword = () => {
  const { user, checkLogin } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res && res.status === 200) {
      }
    })();
  }, []);
  if (user) {
    useRouter.push("/user");
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <ResetForm />
    </Container>
  );
};

export default resetpassword;
