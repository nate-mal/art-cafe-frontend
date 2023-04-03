import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { loadStripe } from "@stripe/stripe-js";
import axios from "/lib/api";
import CartContext from "../../../store/cart-context";
import { minOrder } from "../../../../lib/settings";
import { CircularProgress } from "@mui/material";

const steps = ["Detalii pentru livrare", "Metodă de plată", "Confimă comanda"];

export default function Checkout(props) {
  const ctxCart = React.useContext(CartContext);
  const Router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [payment_method, setPaymentMethod] = React.useState("online");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [jud, setJud] = React.useState("");
  const [loc, setLoc] = React.useState("");
  const [adr, setAdr] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [payment_adr, setPaymentAdr] = React.useState("");
  const [payment_name, setPaymentName] = React.useState("");
  const [samePaymentAddres, setSamePaymentAddress] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const { order, setOrder } = props;
  const [res, setRes] = React.useState({});
  console.log(order);
  const stripePromise = loadStripe(
    "pk_test_51MoUkfBPlc2h5wspzXuCmLzOYdRYOtKPp7W38kzA2SaqraHa7i0i2WfwFypR32vFVDWd8xb2FUNRjIcfAAYLewYq006mChW3T5"
  );
  const handlePayment = async (payment_method) => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post("/api/orders", {
        products: ctxCart.cartContent,
        payment_method,
        name,
        email,
        phone,
        address: `jud. ${jud}, loc.${loc}, ${adr}, Ro`,
        payment_details: {
          address: samePaymentAddres
            ? `jud. ${jud}, loc.${loc}, ${adr}, Ro`
            : payment_adr,
          name: samePaymentAddres ? name : payment_name,
        },
      });
      if (payment_method === "online") {
        await stripe.redirectToCheckout({
          sessionId: res.data.stripeSession.id,
        });
      }
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const dispatchAddress = (key, value) => {
    switch (key) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "jud":
        setJud(value);
        break;
      case "loc":
        setLoc(value);
        break;
      case "adr":
        setAdr(value);
        break;
      case "zip":
        setZip(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "same_payment_address":
        setSamePaymentAddress(value);
        break;
      case "payment_adr":
        setPaymentAdr(value);
        break;
      case "payment_name":
        setPaymentName(value);
        break;
      default:
        break;
    }
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            address={{
              name,
              email,
              jud,
              loc,
              zip,
              adr,
              samePaymentAddres,
              payment_adr,
              payment_name,
            }}
            dispatchAddress={dispatchAddress}
          />
        );
      case 1:
        return (
          <PaymentForm
            payment_method={payment_method}
            setPaymentMethod={setPaymentMethod}
          />
        );
      case 2:
        return (
          <Review
            products={res.products && res.products}
            name={res.name && res.name}
            email={res.email && res.email}
            address={res.address && res.address}
            shipping_tax={res.shipping_tax}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  let checkout_session;
  const handleNext = async () => {
    if (activeStep === 1) {
      if (ctxCart.cartSize <= 0) {
        props.onError();
      } else {
        setLoading(true);
        const res = await handlePayment(payment_method);
        setLoading(false);
        if (res.products) {
          setRes(res);
        }
      }
    }
    if (activeStep === 2) {
      const fetchOrder = async () => {
        // setLoading(true)
        console.log(res.checkout_session);
        try {
          const orderRes = await axios.post("/api/confirm", {
            checkout_session: res.checkout_session,
          });
          console.log(orderRes);

          setOrder(orderRes.data);
          ctxCart.updateCart("CLEAN");
        } catch (err) {
          console.log(err);
          setOrder(null);
        }
        // setLoading(false)
      };
      fetchOrder();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 2) {
      const fetchOrder = async () => {
        console.log(res.checkout_session);
        try {
          const orderRes = await axios.post("/api/cancel", {
            checkout_session: res.checkout_session,
          });
          console.log(orderRes);
        } catch (err) {
          console.log(err);
        }
      };
      fetchOrder();
    }
    setActiveStep(activeStep - 1);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mb: 4 }}
      data-aos="fade-in"
      data-aos-easing="ease"
    >
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h4" gutterBottom align="center">
              Vă mulțumim pentru comanda depusă!
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="justify">
              Comanda a fost confirmată și înregistrată cu nr.
              <Typography variant="span" color="secondary">
                #{order && order.id}
              </Typography>
              . Suntem bucuroși că ați ales produsele noastre și vom face tot
              posibilul pentru a asigura livrarea acestora cât mai curând
              posibil.
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="justify">
              Dacă aveți întrebări sau nelămuriri cu privire la comanda
              dumneavoastră, nu ezitați să ne contactați. Suntem întotdeauna
              bucuroși să vă ajutăm și să vă oferim cele mai bune soluții pentru
              nevoile dumneavoastră.
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="justify">
              Vă mulțumim din nou pentru încrederea acordată și ne dorim să vă
              avem ca și clienți mulțumiți și pe viitor!
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="justify">
              Veți primi un email de confirmare în curând și vă v-om ține la
              curent cu stadiul comenzii d-voastră până la livrare.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
                sx={{ mt: 3, ml: 1, color: "#fff" }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : activeStep === steps.length - 1 ? (
                  "Place order"
                ) : (
                  "Next"
                )}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  );
}

export function EmptyCartMessageComponent() {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mb: 4 }}
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="800"
      data-aos-offset="0"
    >
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ marginBottom: "1em" }}
        >
          Acumulează produse în valoare de minim {(minOrder / 100).toFixed(0)}{" "}
          lei pentru a putea continua.
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="justify">
          Dar nu-ți face griji, suntem aici pentru a te ajuta să găsești cele
          mai bune produse pentru nevoile tale. Îți recomandăm să explorezi gama
          noastră variată de produse și să adaugi câteva dintre acestea în coșul
          tău.
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="justify">
          De asemenea, ține cont că avem o gamă de opțiuni flexibile de livrare
          și plată, astfel încât să poți beneficia de o experiență de
          cumpărături ușoară și convenabilă.
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="justify">
          În cazul în care ai întrebări sau nelămuriri, nu ezita să ne
          contactezi. Suntem întotdeauna bucuroși să îți oferim asistență și să
          îți oferim sugestii pentru produsele care ți s-ar potrivi cel mai
          bine.
        </Typography>
      </Paper>
    </Container>
  );
}