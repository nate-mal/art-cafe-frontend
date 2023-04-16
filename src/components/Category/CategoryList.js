import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

import CategoryItem from "./CategoryItem";
import { Button, Fade, Box, useMediaQuery, useTheme } from "@mui/material";
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
export default function CategoriList({ items, markMeiId }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const sorted_items = items.sort((p1, p2) =>
    p1.name > p2.name ? 1 : p1.name < p2.name ? -1 : 0
  );
  const half = 16;
  const [showHalf, setHalf] = useState(false);
  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Box
       data-aos="fade-zoom-in"
      >
        <Grid item container spacing={2}>
          {sorted_items.slice(0, half).map((item) => {
            return (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <CategoryItem key={item.id} markMeiId={markMeiId} {...item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {showHalf && items.length > half && (
        <Box data-aos="fade-zoom-in">
          <Grid item container spacing={2} sx={{ marginTop: ".4em" }}>
            {sorted_items.slice(half).map((item) => {
              return (
                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                  <CategoryItem key={item.id} markMeiId={markMeiId} {...item} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
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
            <Button variant="outlined" onClick={() => setHalf(true)}>
              Încarcă mai multe
            </Button>
          </Grid>
        </MyFade>
      )}
    </Grid>
  );
}
