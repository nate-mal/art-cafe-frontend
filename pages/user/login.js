import React, { useEffect, useContext } from "react";

import useRouter from "next/router";
import { UserContext } from "../../context/user";

import LoginForm from "../../src/components/LoginPage/LoginForm";

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
