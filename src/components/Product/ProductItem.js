import * as React from "react";
7;
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ImageKit from "../../ImageKit";
import IconButton from "@mui/material/IconButton";
import Link from "../../Link";
import CartContext from "../../store/cart-context";
import { NotificationContext } from "../../../context/notification";
import { DiscountsContext } from "../../../context/discounts";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function MultiActionAreaCard(props) {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const ctxCart = React.useContext(CartContext);
  const ctxNotify = React.useContext(NotificationContext);
  const ctxDiscounts = React.useContext(DiscountsContext);

  const {
    id,
    name,
    price,
    description,
    art_id,
    sub_category,
    sub_category_id,
    slug,
    availability,
    stock_amount,
    pictures,
  } = props;
  function openCart() {
    ctxCart.onShowCart();
  }

  let unavailable_status = null;
  if (availability === "in-stock-in" && (!stock_amount || stock_amount <= 0)) {
    unavailable_status = "sold-out";
  }

  if (
    !["in-stock-ex", "in-stock-in", "undefined-stock", "sold-out"].includes(
      availability
    )
  ) {
    unavailable_status = availability;
  }

  const discount =
    props.discount ||
    ctxDiscounts.getDiscountPercentage(sub_category_id, sub_category);
  const addToCartHandler = (amount) => {
    const item = {
      item: {
        id: id.toString(),
        art_id,
        name,
        price,
        discount,
        description,
        sub_category,
        sub_category_id,
        slug,
      },
      amount: 1,
    };
    ctxCart.updateCart("ADD", item);
    ctxNotify.onNotify(
      "Produs adăugat în coș",

      matchesMD ? openCart : undefined
    );
  };

  console.log(pictures);

  var image_path =
    pictures && pictures[0]
      ? pictures[0].thumbnail_url.substring(
          pictures[0].thumbnail_url.lastIndexOf("/") + 1
        )
      : "Product-Image-Coming-Soon.png";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {discount && (
        <Typography
          variant="body1"
          sx={(theme) => ({
            padding: ".5em",
            position: "absolute",
            top: 10,
            right: 10,
            background: theme.palette.secondary.main,
            color: "#fff",
            borderRadius: "5px",
          })}
        >
          -{discount} %
        </Typography>
      )}
      {unavailable_status && (
        <Typography
          variant="body1"
          sx={(theme) => ({
            fontSize: "1rem",
            padding: ".5em",
            position: "absolute",
            top: 100,
            right: 50,
            background: theme.palette.primary.main,
            color: "#fff",
            borderRadius: "5px",
            zIndex: 10,
          })}
        >
          {unavailable_status === "sold-out" ? "Stoc epuizat" : "Indisponibil"}
        </Typography>
      )}
      <CardActionArea component={Link} href={{ pathname: `/products/${slug}` }}>
        <Grid container direction="column" alignContent="center">
          <Grid item container justifyContent="center" alignItems="center">
            {/* <Tooltip
              title={
                <Image
                  src={image_path}
                  alt={name}
                  width={250}
                  height={250}
                />
              }
              sx={{ width: "300px" }}
              placement="top-end"
            > */}
            <Grid
              item
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(https://ik.imagekit.io/artcafe/tr:w-15,h-15/${image_path})`,
                width: "150px",
                height: "150px",
              }}
            >
              <Box
                style={{
                  heigth: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  objectPosition: "bottom",
                }}
              >
                <ImageKit
                  src={image_path}
                  alt={name}
                  width={150}
                  height={150}
                />
              </Box>
            </Grid>

            {/* </Tooltip> */}
          </Grid>
          <Grid item>
            <CardContent
              sx={{ ".MuiCardContent-root": { paddingBottom: "0px" } }}
            >
              <Typography
                variant="body2"
                color="#000"
                sx={{ fontSize: ".7rem" }}
              >
                {sub_category}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ paddingTop: ".5em" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description.slice(0, 50)}...
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
      <Grid item>
        <Grid
          container
          justifyContent="end"
          sx={{ paddingLeft: ".6em", paddingRight: ".6em" }}
        >
          <Grid item></Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                textDecoration: discount ? "line-through" : "",
              }}
            >
              {(price / 100).toFixed(2)} lei
            </Typography>
          </Grid>
          {discount && (
            <Grid item>
              <Typography
                variant="body2"
                color="secondary"
                sx={{ fontWeight: 600, marginLeft: ".5em" }}
              >
                {(
                  Math.round(price - Math.ceil(price * (discount / 100))) / 100
                ).toFixed(2)}{" "}
                lei
              </Typography>
            </Grid>
          )}
        </Grid>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Button
              size="small"
              color="primary"
              component={Link}
              href={`/products/${slug}`}
            >
              Detalii produs
            </Button>
            <IconButton
              disabled={Boolean(unavailable_status)}
              color="primary"
              aria-label="add to shopping cart"
              onClick={addToCartHandler}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Grid>
        </CardActions>
      </Grid>
    </Card>
  );
}
