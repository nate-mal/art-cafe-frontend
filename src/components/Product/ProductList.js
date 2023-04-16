import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import ProductItem from "./ProductItem";
import NextPagination from "../Pagination/NextPagination";
import classes from "./ProductList.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid({ products, total, limit, offset, query }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NextPagination total={total} limit={limit} offset={offset} query={query}>
        <Grid
          // className={classes["bounce-in"]}
          // data-aos="fade-up"
          item
          container
          spacing={2}
          sx={{ marginTop: "1em", marginBottom: "1em" }}
        >
          {products.map((item) => {
            return (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductItem {...item} />
              </Grid>
            );
          })}
        </Grid>
      </NextPagination>
    </Box>
  );
}
