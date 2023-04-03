import React, { useContext } from "react";
import Router from "next/router";
import Image from "next/image";
import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";
import QuantityPicker from "../Product/ProductDetailed/QuantityPicker/QuantityPicker";
import IconButton from "@mui/material/IconButton";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import { Typography, Grid, Card, InputBase, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CartItem = (props) => {
  const ctxCart = useContext(CartContext);
  const price = `${(props.price / 100).toFixed(2)} lei`;
  const img_path = `/images/${props.art_id}/image-0.jpg`;
  const updateItemHandler = () => {
    const updateAmount = (amount) => {
      ctxCart.updateCart("IN/DECREASE_AMOUNT", {
        id: props.id,
        amount: amount,
      });
    };
    const removeItem = () => {
      ctxCart.updateCart("REMOVE", {
        id: props.id,
      });
    };
    return {
      increment: () => {
        if (Router.pathname === "/checkout") {
          Router.push("/");
        }

        updateAmount(1);
      },
      decrement: () => {
        if (Router.pathname === "/checkout") {
          Router.push("/");
        }
        updateAmount(-1);
      },
      remove: () => {
        if (Router.pathname === "/checkout") {
          Router.push("/");
        }
        removeItem();
      },
    };
  };

  return (
    <li>
      <Grid container direction="column" sx={{ marginTop: "1em" }}>
        <Grid item>
          <Typography variant="body1" component="h5">
            {props.name}
          </Typography>
        </Grid>
        <Grid item container xs={4}>
          <Grid item>
            <Image
              width={75}
              height={75}
              src={img_path}
              alt={props.name}
              sx={{ padding: "1em" }}
            />
          </Grid>
          <Grid item container alignItems="center" xs={8}>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                component="span"
                sx={{
                  fontWeight: "bold",
                  border: 1,
                  borderColor: "#363636",
                  padding: "0.25rem",
                  borderRadius: "6px",
                  color: "#363636",
                }}
              >
                x {props.amount}
              </Typography>

              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", color: "#8a2b06", padding: ".5em" }}
              >
                {price}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Card
                sx={{
                  borderRadius: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  aria-label="decrease quantity by one"
                  color="primary"
                  onClick={updateItemHandler().decrement}
                >
                  <RemoveCircleSharpIcon />
                </IconButton>

                {/* <InputBase
                  sx={{
                    width: "1.5em",
                    input: { textAlign: "center" },
                  }}
                  value={props.amount}
                /> */}
                <IconButton
                  onClick={updateItemHandler().increment}
                  aria-label="increase quantity by one"
                  color="primary"
                >
                  <AddCircleSharpIcon />
                </IconButton>
              </Card>
            </Grid>
            <Grid item xs={1} sx={{ paddingLeft: "1em" }}>
              <IconButton color="primary" onClick={updateItemHandler().remove}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={(theme) => ({
          height: "5px",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "10px",
        })}
      ></Box>
    </li>
  );
};

export default CartItem;

{
  /* <div className={classes.actions}>
            <button onClick={updateItemHandler().decrement}>−</button>
            <button onClick={updateItemHandler().increment}>+</button>
            <button onClick={updateItemHandler().remove}>X</button>
          </div> */
}
