import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

import ModelItem from "./ModelItem";
import { Button, Fade, Box, useMediaQuery, useTheme } from "@mui/material";
// import NextPagination from "../Pagination/NextPagination";
const MyFade = ({
  children,
  in: In = true,
  timeout = 1000,
  delay = 0,
  easing = "ease-in-out",
}) => {
  const [isIn, setIsIn] = useState(In && delay === 0);

  useEffect(() => {
    if (delay > 0) {
      setTimeout(() => setIsIn(true), delay);
    }
  });

  return (
    <Fade in={isIn} timeout={timeout} easing={easing}>
      {children}
    </Fade>
  );
};

export default function ModelList({ items }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.between("md", "lg"));
  console.log(matchesMD);
  const half = matchesMD ? 15 : 16;
  // const [showItems, setShowItems] = useState(items.slice(0, half));
  const [showHalf, setShowHalft] = useState(false);
  return (
    <Grid container style={{ flexGrow: 1 }}>
      {/* <NextPagination total={total} limit={limit}> */}
      <Box>
        <Grid item container spacing={2}>
          {items.slice(0, half).map((item, index) => {
            return (
              <Grid key={item.id} item>
                <ModelItem key={item.id} {...item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {showHalf && (
        <Fade in={true} timeout={800}>
          <Grid item container spacing={2} sx={{ marginTop: ".4em" }}>
            {items.slice(half).map((item) => {
              return (
                <Grid key={item.id} item>
                  <ModelItem half={true} key={item.id} {...item} />
                </Grid>
              );
            })}
          </Grid>
        </Fade>
      )}
      {!showHalf && items.length > half && (
        <MyFade
          in={true}
          timeout={800}
          delay={600}
          easing="cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        >
          <Grid
            item
            container
            justifyContent="center"
            sx={{ marginTop: "3em" }}
          >
            <Button variant="outlined" onClick={() => setShowHalft(true)}>
              Încarcă mai multe
            </Button>
          </Grid>
        </MyFade>
      )}
      {/* </NextPagination> */}
    </Grid>
  );
}
