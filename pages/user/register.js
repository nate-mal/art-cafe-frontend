import React, { useEffect, useContext } from "react";

import useRouter from "next/router";
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

  return <RegisterForm />;
}

export default Register;
