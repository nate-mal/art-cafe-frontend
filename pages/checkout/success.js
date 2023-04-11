import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "../../lib/api";
import CartContext from "../../src/store/cart-context";
const Root = styled("div")({
  flexGrow: 1,
  margin: "2rem",
});

const CustomPaper = styled(Paper)({
  padding: "2rem",
  textAlign: "center",
  color: (props) => props.theme.palette.text.secondary,
});

function ThankYouPage({ res }) {
  const ctxCart = React.useContext(CartContext);
  React.useEffect(() => {
    ctxCart.updateCart("CLEAN");
  }, [ctxCart.cartSize]);
  console.log(res);
  return (
    <Root>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignContent="center"
        sx={{ minHeight: "80vh" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <CustomPaper
            data-aos="fade-up"
            sx={{
              border: 1,
              borderColor: "#81C784",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              color="#81C784"
            >
              Îți mulțumim pentru comanda depusă!
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              align="justify"
              color="#81C784"
            >
              {" "}
              {res.payment_status === "paid"
                ? "Tranzacția a fost efectuată cu succes și comanda a fost înregistrată cu nr."
                : "Comanda a fost înregistrată cu nr."}
              <Typography variant="span" color="secondary">
                #{res && res.id}.
              </Typography>
            </Typography>

            <Typography
              variant="subtitle1"
              gutterBottom
              align="justify"
              color="#81C784"
            >
              Veți primi un email de confirmare în curând și vă vom ține la
              curent cu stadiul comenzii d-voastră până la livrare.
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="justify">
              Suntem bucuroși că ați ales produsele noastre și vom face tot
              posibilul pentru a asigura livrarea acestora cât mai curând
              posibil.
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="justify">
              Dacă aveți întrebări sau nelămuriri cu privire la comanda
              dumneavoastră, nu ezitați să ne contactați. Suntem întotdeauna
              bucuroși să vă ajutăm și să vă oferim cele mai bune soluții pentru
              nevoile dumneavoastră. Vă mulțumim din nou pentru încrederea
              acordată și ne dorim să vă avem ca și clienți mulțumiți și pe
              viitor!
            </Typography>
          </CustomPaper>
        </Grid>
      </Grid>
    </Root>
  );
}

export default ThankYouPage;

export async function getServerSideProps(ctx) {
  const { checkout_session, stripeId } = ctx.query;

  const confirmOrder = async (checkout_session, stripeId) => {
    // setLoading(true)

    try {
      const orderRes = await axios.post("/api/confirm", {
        checkout_session,
        stripeId,
      });
      console.log(orderRes);

      return orderRes.data;
    } catch (err) {
      console.log(err);
      return null;
    }
    // setLoading(false)
  };
  const res = await confirmOrder(checkout_session, stripeId);

  if (!res || res.status !== "confirmed") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        // statusCode: 405,
      },
    };
  }

  return { props: { res } };
}
