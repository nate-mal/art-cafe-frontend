import React, { useContext, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "../../../lib/api";
import styles from "./Cart.module.css";
// import Card from "../UI/Card/Card";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Button,
  SwipeableDrawer,
  Typography,
  Chip,
} from "@mui/material";
import Router from "next/router";
// import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import CloseIcon from "@mui/icons-material/Close";
import { minOrder } from "../../../lib/settings";
// import Checkout from "./Checkout";
const Cart = (props) => {
  const ctxCart = useContext(CartContext);
  // const [showCheckout, setShowCheckout] = useState(false);
  const [hasOrder, setHasOrder] = useState(false);
  // const stripePromise = loadStripe(
  //   "pk_test_51MoUkfBPlc2h5wspzXuCmLzOYdRYOtKPp7W38kzA2SaqraHa7i0i2WfwFypR32vFVDWd8xb2FUNRjIcfAAYLewYq006mChW3T5"
  // );
  // const handlePayment = async () => {
  //   try {
  //     const stripe = await stripePromise;
  //     const res = await axios.post("/api/orders", {
  //       products: ctxCart.cartContent,
  //     });

  //     await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleCheckout = () => {
    Router.push("/checkout");
  };
  const getCartItems = () => {
    return (
      <>
        {ctxCart.cartContent.map((cartItem) => {
          return (
            <CartItem
              art_id={cartItem.item.art_id}
              id={cartItem.item.id}
              key={cartItem.item.id}
              name={cartItem.item.name}
              price={cartItem.item.price * cartItem.amount}
              amount={cartItem.amount}
            />
          );
        })}
      </>
    );
    // showCheckout;
  };
  const getActions = () => {
    return (
      <div className={styles.actions} style={{ marginTop: "auto" }}>
        {ctxCart.cartContent.length > 0 && (
          <Button
            // variant="contained"
            disabled={ctxCart.cartCost < minOrder}
            color="secondary"
            // component={Link}
            // href={estimate.link}
            onClick={() => {
              ctxCart.showCart.function();
              handleCheckout();
            }}
            sx={(theme) => {
              const left = Math.ceil((ctxCart.cartCost * 100) / minOrder);
              const right = 100 - left;

              return {
                ...theme.typography.estimate,
                backgroundColor: theme.palette.secondary.main,
                "&:hover": { backgroundColor: theme.palette.secondary.light },
                borderRadius: "50px",
                marginLeft: "10px",
                marginRight: "15px",
                color: "white",
                backgroundImage: `linear-gradient(to right, ${theme.palette.secondary.main} ${left}%,  #FFFFFF ${right}%)`,
              };
            }}
            // style={{
            //   background: "linear-gradient(to right, #430089 50%, #82ffa1 51%)",
            // }}
          >
            Finalizează comanda
          </Button>
        )}
        {minOrder > ctxCart.cartCost ? (
          <Typography variant="subtitle1" style={{ fontSize: "1rem" }}>
            *adaugă {((minOrder - ctxCart.cartCost) / 100).toFixed(2)} lei
            (comandă minimă {minOrder / 100} lei)
          </Typography>
        ) : (
          <Typography variant="subtitle1" style={{ fontSize: "1rem" }}>
            *felicitări, comanda poate fi efectuată
          </Typography>
        )}
      </div>
    );
  };
  return (
    <SwipeableDrawer
      anchor="right"
      open={ctxCart.showCart.value}
      onClose={ctxCart.showCart.function}
      onOpen={ctxCart.showCart.function}
      style={{ zIndex: 10000 }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ padding: "1em", width: "100vw", maxWidth: "400px" }}
      >
        <Grid item container justifyContent="space-between">
          <Typography variant="h5">Coșul tău:</Typography>
          <IconButton onClick={ctxCart.showCart.function}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item sx={{ height: "70vh" }}>
          <ul className={styles["cart-items"]}>
            {ctxCart.cartContent.length > 0 ? (
              getCartItems()
            ) : (
              <h1
                style={{ marginTop: "30vh" }}
                className={styles.empty__message}
              >
                {hasOrder ? "Comanda ta este pe drum" : "Coșul tău este gol"}
              </h1>
            )}
          </ul>
        </Grid>
        <Grid item>
          <h1 className={styles.total}>{`Total: ${(
            ctxCart.cartCost / 100
          ).toFixed(2)} lei`}</h1>
          {getActions()}
        </Grid>
      </Grid>

      {/* {showCheckout && (
        <Checkout
          onCancel={() => {
            setShowCheckout(false);
          }}
          onSuccess={() => {
            setHasOrder(true);
          }}
        />
      )} */}
    </SwipeableDrawer>
  );
};

export default Cart;
