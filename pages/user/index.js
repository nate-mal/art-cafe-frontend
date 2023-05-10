import Logout from "../../src/components/LoginPage/Logout";
import Link from "next/link";
import { useEffect, useContext } from "react";

import { UserContext } from "../../context/user";
import GoogleLogin from "../../src/components/LoginPage/GoogleLogin";
import FacebookLogin from "../../src/components/LoginPage/FacebookLogin";

import Router, { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const { user, email, id, checkLogin } = useContext(UserContext);
  const { query } = useRouter();
  const error = query.msg;
  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res.status === 200) {
      } else {
        Router.push("/user/login");
      }
    })();
  }, [user]);

  return (
    <Grid item style={{ minHeight: "100vh" }}>
      {error && <div>{error}</div>}
      {user && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "2em" }}
        >
          <div>
            <h1>Welcome</h1>
            <p>
              {id} - {user} {email}
              <br />
            </p>
          </div>
          <Logout />
        </Grid>
      )}

      {!user && (
        <Grid
          container
          style={{ height: "90vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="secondary" />
        </Grid>
      )}
    </Grid>
  );
}
