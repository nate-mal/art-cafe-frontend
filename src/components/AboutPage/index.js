import React from "react";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "../../Link";

import Image from "next/image";
const AboutUs = () => {
  const theme = useTheme();
  const matchesLg = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          paddingLeft: matchesSm ? "1em" : matchesMd ? "5em" : "10em",
          paddingRight: matchesSm ? "1em" : matchesMd ? "5em" : "10em",
          paddingTop: "2em",
          paddingBottom: "10em",
        }}
      >
        <Grid item>
          <Typography
            variant="h2"
            sx={{
              ...theme.typography.revTitle,
              textAlign: matchesLg ? "center" : "inherit",
              marginLeft: matchesLg ? "none" : "2em",
              marginBottom: matchesSm ? "1em" : "2em",
            }}
          >
            About Us
          </Typography>
        </Grid>
        <Grid item container spacing={matchesMd ? 4 : 12}>
          <Grid item xs={matchesMd ? 12 : 8} d>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: "1.5em",
                marginBottom: "0.5em",
                marginLeft: "2em",
              }}
            >
              Art Cafe Store
            </Typography>
            <Box>
              <Typography variant="body2" paragraph>
                Bine ați venit la Art Cafe, magazinul online specializat în
                vânzarea de piese de schimb pentru aparatele de cafea! Cu o gamă
                variată de peste 10.000 de produse, suntem aici pentru a vă
                ajuta să vă mențineți aparatul de cafea în stare perfectă de
                funcționare.
              </Typography>
              <Typography variant="body2" paragraph>
                La Art Cafe, ne dedicăm să vă oferim cele mai bune soluții
                pentru nevoile dumneavoastră. Echipa noastră de experți
                pasionați de cafea lucrează din greu pentru a selecta cele mai
                fiabile și de înaltă calitate piese de schimb de pe piață,
                pentru a asigura funcționarea optimă a aparatului dumneavoastră
                de cafea.
              </Typography>{" "}
              <Typography
                variant="body2"
                paragraph
                data-aos={matchesMd ? "fade-up" : ""}
              >
                Beneficiind de cele mai moderne tehnologii, am creat un sistem
                avansat de căutare și filtrare a produselor, astfel încât să
                găsiți cu ușurință piesa dorită. Oferim informații detaliate
                despre modelele compatibile, astfel încât să puteți fi siguri că
                piesa pe care o achiziționați se potrivește perfect aparatului
                dumneavoastră de cafea.
              </Typography>{" "}
              <Typography
                variant="body2"
                paragraph
                data-aos={matchesMd ? "fade-up" : ""}
              >
                În plus, înțelegem importanța compatibilității și, de aceea,
                punem la dispoziție metode de filtrare a produselor în funcție
                de marca și modelul dorit. Această funcționalitate vă permite să
                economisiți timp și să găsiți rapid piesa de schimb potrivită
                pentru aparatul dumneavoastră.
              </Typography>{" "}
              <Typography
                variant="body2"
                paragraph
                data-aos={matchesMd ? "fade-up" : ""}
              >
                Ne mândrim cu serviciul nostru de înaltă calitate și
                angajamentul nostru față de satisfacția clienților. Echipa
                noastră prietenoasă și bine pregătită este întotdeauna aici
                pentru a vă oferi asistență și sfaturi profesionale în alegerea
                pieselor de schimb potrivite.
              </Typography>{" "}
              <Typography
                variant="body2"
                paragraph
                data-aos={matchesMd ? "fade-up" : ""}
              >
                La Art Cafe, suntem dedicați să vă ajutăm să vă bucurați de o
                cafea delicioasă și să mențineți performanța aparatului
                dumneavoastră de cafea. Așteptăm cu nerăbdare să vă ajutăm să
                găsiți piesa de schimb perfectă și să vă oferim o experiență
                plăcută de cumpărături online.
              </Typography>{" "}
            </Box>
          </Grid>
          <Grid
            item
            container
            alignContent="center"
            justifyContent="center"
            xs={matchesMd ? 12 : 4}
          >
            <Image
              width={250}
              sx={{
                height: matchesSm
                  ? 200
                  : matchesMd
                  ? "100%"
                  : matchesLg
                  ? "150px"
                  : "200px",
                width: matchesSm
                  ? "300px"
                  : matchesMd
                  ? "100%"
                  : matchesLg
                  ? "200px"
                  : "300px",
              }}
              height={250}
              src="/assets/history.svg"
              alt="history book "
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          sx={{
            marginTop: matchesMd ? "10em" : "15em",
            textAlign: "center",
          }}
          data-aos="fade-up"
        >
          <Grid item sx={{ p: { maxWidth: "500px" } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: "1.5em",
                marginBottom: "0.5em",
                marginLeft: ".5em",
              }}
            >
              Team
            </Typography>
            <Typography variant="body2" paragraph>
              George, Founder
            </Typography>
            <Box
              item
              sx={{
                img: {
                  width: "200px",
                  height: "200px",
                  verticalAlign: "middle",
                  borderRadius: "50%",
                  marginBottom: "2em",
                },
              }}
            >
              <Image
                src="/assets/founder-george.jpg"
                alt="founder avatar"
                width={450}
                height={450}
              />
            </Box>
            <Typography variant="body2" paragraph>
              Sunt fondatorul Art Cafe, un magazin online dedicat pieselor de
              schimb și serviciilor de reparație pentru aparatele de cafea. Vă
              invit să descoperiți povestea noastră și să aflați mai multe
              despre angajamentul nostru față de calitate și satisfacția
              clienților.
            </Typography>
            <Typography variant="body2" paragraph>
              Înțelegem că nu toată lumea își permite să cumpere un aparat de
              cafea nou, dar asta nu înseamnă că trebuie să renunțați la
              calitatea și plăcerea de a savura o cafea perfectă. De aceea,
              ne-am dedicat să oferim opțiuni accesibile și fiabile prin
              intermediul aparatelor de cafea recondiționate.
            </Typography>
            <Typography
              variant="body2"
              paragraph
              data-aos={matchesMd ? "fade-up" : ""}
            >
              Magazinul nostru online dispune de o gamă variată de aparate de
              cafea recondiționate, potrivite pentru diferite preferințe și
              bugete. Ne asigurăm că toate aparatele noastre recondiționate sunt
              în stare excelentă de funcționare și vă oferim informații
              detaliate despre fiecare aparat, inclusiv caracteristici,
              specificații și compatibilitate.
            </Typography>

            <Typography
              variant="body2"
              paragraph
              data-aos={matchesMd ? "fade-up" : ""}
            >
              Vă invităm să explorați gama noastră de aparate de cafea
              recondiționate și să descoperiți plăcerea de a savura o cafea
              perfectă la dumneavoastră acasă sau la birou. La Art Cafe, suntem
              dedicați să vă oferim produse și servicii de încredere, astfel
              încât să vă puteți bucura de o experiență autentică de cafea.
            </Typography>

            <Button
              variant="contained"
              component={Link}
              href="/products?markMeiId=mark-1&category=157&categoryName=Aparate automate recondiționate"
              data-aos="fade-up"
              sx={() => ({
                ...theme.typography.estimate,
                borderRadius: 50,
                hieght: 80,
                width: "fit-content",
                backgroundColor: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                },
                fontsize: "1.5rem",
                marginTop: "2em",
              })}
            >
              Caută următorul tău aparat
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutUs;
