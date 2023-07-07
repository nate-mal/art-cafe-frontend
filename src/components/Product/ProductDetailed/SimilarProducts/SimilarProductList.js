import * as React from "react";

import classes from "./SimilarProductList.module.css";
import ProductItem from "../../ProductItem";
import { Box } from "@mui/material";

const SimilarProductList = ({ products }) => {
  return (
    <>
      <div className={classes.container}>
        {products.map((item, index) => (
          <div key={index} className={classes.card}>
            <ProductItem {...item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SimilarProductList;
