import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useScroll } from "react-use-gesture";
import classes from "./SimilarProductList.module.css";
import ProductItem from "../../ProductItem";
const clamp = (value, clampAt = 30) => {
  if (value > 0) {
    return value > clampAt ? clampAt : value;
  } else {
    return value < -clampAt ? -clampAt : value;
  }
};

const movies = [
  "https://artcafe.s3.eu-central-1.amazonaws.com/10007557_image_0_4f471dbe7a.jpg",
];

const SimilarProductList = ({ products }) => {
  const controls = useAnimation();
  const bind = useScroll((event) => {
    controls.start({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`,
    });
  });

  return (
    <>
      <div className={classes.container} {...bind()}>
        {products.map((item, index) => (
          <motion.div
            key={index}
            className={classes.card}
            // style={{
            //   backgroundImage: `url(${movies[0]})`,
            // }}
            animate={controls}
          >
            <ProductItem {...item} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SimilarProductList;
