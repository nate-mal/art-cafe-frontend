import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTheme, useMediaQuery, Card, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { NotificationContext } from "../../../../context/notification";
import Router from "next/router";
import LabTabs from "./LabTabs";
import Link from "../../../Link";
import classes from "./ProductDetailed.module.css";
import QuantityPicker from "./QuantityPicker/QuantityPicker";
import CartContext from "../../../store/cart-context";
export default function ProductDetailed({ item }) {
  const ctxCart = React.useContext(CartContext);
  const ctxNotify = React.useContext(NotificationContext);
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const {
    id,
    name,
    price,
    art_id,
    description,
    compatible_models,
    deliveryInfo,
    discount,
    unavailable_status,
    sub_category,
    sub_category_id,
    slug,
  } = item;

  const [qty, setQty] = React.useState(1);
  const [url, setUrl] = React.useState("url");
  const addToCartHandler = () => {
    const item = {
      item: {
        id,
        art_id,
        name,
        price,
        discount,
        description,
        sub_category,
        sub_category_id,
        slug,
      },
      amount: qty,
    };
    ctxCart.updateCart("ADD", item);
    ctxNotify.onNotify(
      ` ${
        +item.amount > 1
          ? item.amount + " produse adăugate în coș"
          : "Produs adăugat în coș "
      }`,
      matchesMD ? ctxCart.onShowCart : undefined
    );
  };

  React.useEffect(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    const path = Router.asPath;
    setUrl(`${origin}${path}`);
  }, []);
  console.log(unavailable_status);

  return (
    <Grid item md alignItems="center" sx={{ position: "relative" }}>
      <Typography
        variant="h5"
        component="h3"
        align="center"
        color="primary"
        sx={{ marginBottom: "2em" }}
      >
        {name}
      </Typography>
      <Grid
        container
        justifyContent="space-between"
        sx={{ marginBottom: "2em" }}
      >
        <Typography variant="body2">
          Preț:
          <strong
            style={{
              color: theme.palette.primary.main,
              fontSize: "1rem",
              marginLeft: ".5em",
              textDecoration: discount ? "line-through" : "",
            }}
          >
            {price / 100} lei
          </strong>
          {discount && (
            <strong
              style={{
                color: theme.palette.secondary.main,
                fontSize: "1rem",
                marginLeft: ".5em",
              }}
            >
              {(
                Math.round(price - Math.ceil(price * (discount / 100))) / 100
              ).toFixed(2)}
              lei
            </strong>
          )}
        </Typography>

        <Typography variant="body2">
          Art. nr.:
          <strong
            style={{ color: "#000", fontSize: "1rem", marginLeft: ".5em" }}
          >
            {art_id}
          </strong>
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        sx={{ marginBottom: "2em" }}
      >
        <QuantityPicker value={qty} setValue={setQty} />
        <Grid item>
          {unavailable_status === "on_demand" ? (
            <Button
              variant="contained"
              sx={{
                ...theme.typography.estimate,
                borderRadius: 50,
                backgroundColor: theme.palette.primary.main,
                width: "fit-content",
                fontSize: "1.25rem",

                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              href={`https://api.whatsapp.com/send/?phone=40751465658&text=${url}`}
              component={Link}
              target="_blank"
            >
              <WhatsAppIcon style={{ marginRight: ".5em" }} />
              <p> Comandă </p>
            </Button>
          ) : (
            <Button
              disabled={Boolean(unavailable_status)}
              variant="contained"
              sx={{
                borderRadius: "50px",
              }}
              onClick={addToCartHandler}
            >
              {unavailable_status ? (
                <div>Indisponibil</div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  Adaugă în coș{" "}
                  <AddShoppingCartIcon sx={{ marginLeft: ".5em" }} />
                </div>
              )}
            </Button>
          )}
        </Grid>
      </Grid>
      {unavailable_status === "on_demand" && (
        <Grid item>
          <Typography variant="body1" color="red">
            Produs indisponibil, doar pe comandă, termen estimativ de livrare
            14-28 zile.
          </Typography>
        </Grid>
      )}
      <LabTabs
        items={[
          {
            label: "Descriere",
            component: (
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
              >
                {description ? description : "Nu există descriere"}
              </Typography>
            ),
          },
          {
            label: "Modele compatibile",
            component:
              compatible_models && compatible_models.length > 0 ? (
                compatible_models.map((group) => (
                  <Box key={group.markId}>
                    <Typography key={group.markId} variant="h6">
                      {group.markName}
                    </Typography>
                    <Card
                      className={classes.scroll}
                      sx={{
                        maxHeight: "300px",
                        overflow: "scroll",
                        padding: "1em",
                        scrollbarColor: theme.palette.primary.main,
                      }}
                    >
                      {group.models.map((model) => (
                        <Typography key={model.id} variant="body2">
                          {model.name}
                        </Typography>
                      ))}
                    </Card>
                  </Box>
                ))
              ) : (
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ whiteSpace: "pre-wrap" }}
                >
                  Nu exista date sau produsul este universal
                </Typography>
              ),
          },
          {
            label: (
              <div style={{ display: "flex", alignItems: "center" }}>
                Politici (<LocalShippingIcon />)
              </div>
            ),
            component: (
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
              >
                {deliveryInfo}
              </Typography>
            ),
          },
        ]}
      />
    </Grid>
  );
}
