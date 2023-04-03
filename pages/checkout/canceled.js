import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "../../lib/api";
const Root = styled("div")({
  flexGrow: 1,
  margin: "2rem",
});

const CustomPaper = styled(Paper)({
  padding: "2rem",
  textAlign: "center",
  color: (props) => props.theme.palette.text.secondary,
});

function WeAreSorry({ res }) {
  //   useEffect(() => {
  //     AOS.init({ duration: 1000 });
  //   }, []);
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
            sx={{ border: 1, borderColor: "#e57373" }}
          >
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              color="#e57373"
            >
              Comanda a fost anulată!
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              align="justify"
              color="#e57373"
            >
              Ne pare rău să aflăm că comanda dumneavoastră a fost anulată. Vă
              asigurăm că depunem toate eforturile pentru a vă oferi cele mai
              bune produse și servicii, iar situația dumneavoastră ne
              îngrijorează. În cazul în care ați întâmpinat probleme cu comanda
              dumneavoastră, vă rugăm să ne contactați pentru a identifica și
              remedia problema cât mai curând posibil. Suntem la dispoziția
              dumneavoastră și suntem pregătiți să oferim soluții pentru a vă
              asigura o experiență de cumpărare pozitivă. Dacă anularea comenzii
              a fost cauzată de probleme tehnice, vă rugăm să încercați din nou
              și să ne anunțați în cazul în care întâmpinați dificultăți. În
              plus, vă putem oferi alternative de plată sau de livrare, în cazul
              în care acestea ar putea ajuta la finalizarea comenzii
              dumneavoastră.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              align="justify"
              color="#e57373"
            >
              Vă mulțumim pentru înțelegere și sperăm să vă putem servi cu
              succes în viitor!"
            </Typography>
          </CustomPaper>
        </Grid>
      </Grid>
    </Root>
  );
}

export default WeAreSorry;

export async function getServerSideProps(ctx) {
  const { checkout_session } = ctx.query;

  const cancelOrder = async (checkout_session) => {
    // setLoading(true)

    try {
      const orderRes = await axios.post("/api/cancel", {
        checkout_session,
      });
      console.log(orderRes);

      return orderRes.data;
    } catch (err) {
      console.log(err);
      return null;
    }
    // setLoading(false)
  };
  const res = await cancelOrder(checkout_session);

  if (!res || res.status !== "canceled") {
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
