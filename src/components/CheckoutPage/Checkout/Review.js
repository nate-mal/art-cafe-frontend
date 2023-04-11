import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";
// const products = [
//   {
//     name: "Product 1",
//     desc: "A nice thing",
//     price: "$9.99",
//   },
//   {
//     name: "Product 2",
//     desc: "Another thing",
//     price: "$3.45",
//   },
//   {
//     name: "Product 3",
//     desc: "Something else",
//     price: "$6.51",
//   },
//   {
//     name: "Product 4",
//     desc: "Best thing of all",
//     price: "$14.11",
//   },
//   { name: "Shipping", desc: "", price: "Free" },
// ];

export default function Review(props) {
  const name = props.name;
  const email = props.email;
  const phone = props.phone;
  const address = props.address;
  const shipping = props.shipping_tax;
  const payments = [
    { name: "Ramburs la livrare", detail: "Plata va fi efectuată la livrare" },
    { name: "Cost livrare", detail: `${(shipping / 100).toFixed(2)} lei` },
  ];

  let total = 0;
  const products = props.products.map((item) => {
    const price = item.price_data.unit_amount;
    const art_id = item.price_data.product_data.art_id;
    total += price * item.quantity;
    return {
      name: item.price_data.product_data.name,
      desc: item.description,
      price: price,
      quantity: item.quantity,
      art_id: art_id,
    };
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Conținutul comenzi:
      </Typography>
      <List disablePadding>
        {products.map((product, index) => {
          const img_path = `/images/${product.art_id}/image-0.jpg`;
          return (
            <ListItem key={index}>
              <Grid container direction="column" sx={{ marginTop: "1em" }}>
                <Grid item>
                  <Typography variant="body1" component="h5">
                    {product.name}
                  </Typography>
                </Grid>
                <Grid item container xs={4}>
                  <Grid item>
                    <Image
                      width={75}
                      height={75}
                      src={img_path}
                      alt={product.name}
                      sx={{ padding: "1em" }}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    xs={8}
                  >
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
                        x {product.quantity}
                      </Typography>

                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          fontWeight: "thin",
                          color: "gray",
                          padding: ".5em",
                        }}
                      >
                        {`${(product.price / 100).toFixed(2)} lei(bucata)`}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        component="div"
                        align="right"
                        sx={{
                          fontWeight: "bold",
                          color: "gray",
                          // padding: ".5em",
                        }}
                      >
                        {`${((product.price * product.quantity) / 100).toFixed(
                          2
                        )} lei`}
                      </Typography>
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
            </ListItem>
          );
        })}
      </List>
      <Grid container justifyContent="space-between" sx={{ marginTop: "1em" }}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
            Subtotal:
          </Typography>
        </Grid>
        <Grid item container xs={8} justifyContent="end">
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {`${(total / 100).toFixed(2)} lei`}
          </Typography>
          <Typography color="gray">(tva inclus)</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalii livrare:
          </Typography>
          <Typography gutterBottom>{name}</Typography>
          <Typography gutterBottom>{email}</Typography>
          <Typography gutterBottom>{phone}</Typography>
          <Typography gutterBottom>{address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalii plată:
          </Typography>
          <Grid container>
            {payments.map((payment, index) => (
              <Grid item key={index}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between" sx={{ marginTop: "1em" }}>
        <Grid item xs={4}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            Total
          </Typography>
        </Grid>
        <Grid item container xs={8} justifyContent="end">
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {`${((total + shipping) / 100).toFixed(2)} lei`}
          </Typography>
          <Typography color="primary">(tva inclus)</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
