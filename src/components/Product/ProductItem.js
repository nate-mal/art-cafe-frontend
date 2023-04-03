import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Button,
  CardActionArea,
  CardActions,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Link from "../../Link";
import CartContext from "../../store/cart-context";
import { NotificationContext } from "../../../context/notification";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function MultiActionAreaCard(props) {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const ctxCart = React.useContext(CartContext);
  const ctxNotify = React.useContext(NotificationContext);

  const { id, name, price, description, art_id, sub_category, slug } = props;
  function openCart() {
    ctxCart.onShowCart();
  }
  const addToCartHandler = (amount) => {
    const item = {
      item: { id: id.toString(), art_id, name, price, description },
      amount: 1,
    };
    ctxCart.updateCart("ADD", item);
    ctxNotify.onNotify(
      "Produs adăugat în coș",

      matchesMD ? openCart : undefined
    );
  };

  const image_path = `/images/${art_id}/image-0.jpg`;
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea component={Link} href={{ pathname: `/products/${slug}` }}>
        <Grid container direction="column" alignContent="center">
          <Grid item container justifyContent="center">
            <Tooltip
              title={
                <Image src={image_path} alt={name} width={250} height={250} />
              }
              sx={{ width: "300px" }}
              placement="top-end"
            >
              <Image src={image_path} alt={name} width={150} height={150} />
            </Tooltip>
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
          justifyContent="space-between"
          sx={{ paddingLeft: ".6em", paddingRight: ".6em" }}
        >
          <Grid item></Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {price / 100} lei
            </Typography>
          </Grid>
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
