import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";

import { UserContext } from "../../context/user";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
export default function googleCallback() {
  const [error, setError] = useState();
  const router = useRouter();
  const { doGoogleCallback, user, setUser } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      if (router.query.access_token) {
        const res = await doGoogleCallback({
          access_token: router.query.access_token,
        });
        if (res[0] === "alert") {
          setError(res[1]);
        }
        setUser(res[1].username);
      }
    })();
  }, [router]);
  if (user) {
    router.push("/user");
  }
  if (error) {
    router.push(`/user?msg=${error}`);
  }

  return (
    <Box style={{ minHeight: "100vh" }}>
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
    </Box>
  );
}
