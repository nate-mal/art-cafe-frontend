import { useState, createContext } from "react";
export const UserContext = createContext(null);
import { linstance } from "../lib/api";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [loggingIn, setLoggingIn] = useState(false);
  const [id, setId] = useState();
  const [dummy, setDummy] = useState();

  async function dummyfunction() {
    return "dummy function invoked";
  }

  async function doRegister(values) {
    var ret = ["niente"];
    try {
      const resp = await linstance.post("/api/auth/register", values);
      return ["OK", resp.data.message];
    } catch (error) {
      return ["alert", error.response.data.message];
    }
  }
  async function doLogin(values) {
    try {
      setLoggingIn(true);
      const resp = await linstance.post("/api/auth/login", values);
      setLoggingIn(false);
      return resp.data;
    } catch (error) {
      setLoggingIn(false);

      return ["alert", error.response.data.message];
    }
  }
  async function checkLogin() {
    try {
      const resp = await linstance.get("/api/auth/user");
      setUser(resp.data.user);
      setEmail(resp.data.email);
      setId(resp.data.id);
      return resp;
    } catch (error) {
      return error.response;
    }
  }
  const doLogout = async () => {
    const resp = await linstance.post("/api/auth/logout", {
      method: "POST",
    });
    if (resp.data.message == "success") {
      setUser("");
      setEmail("");
      setId("");
    }
  };
  async function doGoogleCallback(values) {
    try {
      const resp = await linstance.post("/api/auth/google/callback", values);
      return ["OK", resp.data.message];
    } catch (error) {
      return ["alert", error.response.data.message];
    }
  }
  async function doFacebookCallback(values) {
    try {
      const resp = await linstance.post("/api/auth/facebook/callback", values);
      return ["OK", resp.data.message];
    } catch (error) {
      return ["alert", error.response.data.message];
    }
  }
  async function doRemind(values) {
    try {
      const resp = await linstance.post("/api/auth/reminder", values);
      return ["OK", resp.data.message];
    } catch (error) {
      return ["alert", error.response.data.message];
    }
  }
  async function doReset(values) {
    try {
      const resp = await linstance.post("/api/auth/reset", values);
      return ["OK", resp.data.message];
    } catch (error) {
      return ["alert", error.response.data.message];
    }
  }

  const useract = {
    dummy: dummy,
    setDummy: setDummy,
    dummyfunction: dummyfunction,
    doRegister: doRegister,
    user: user,
    setUser: setUser,
    email: email,
    setEmail: setEmail,
    id: id,
    setId: setId,
    checkLogin: checkLogin,
    doLogin: doLogin,
    loggingIn,
    doLogout: doLogout,
    doGoogleCallback,
    doFacebookCallback,
    doRemind,
    doReset,
  };

  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
