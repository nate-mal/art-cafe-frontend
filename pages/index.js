import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MarkList from "../src/components/Mark/MarkList";
import LandingPage from "../src/components/LandingPage/LandingPage";
import { MeiliSearch } from "meilisearch";
import Head from "next/head";

export default function Marks({ marks }) {
  return (
    <>
      <Head>
        <title>Art Cafe</title>
        <meta
          name="description"
          content="  Piese de schimb pentru aparatele de cafea Jura, DeLonghi, Saeco,
              Nivona, Siemens, Melitta, Philips, Philips-Saeco, Krups, Miele,
              Bosch si Gaggia."
        />
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* <Link href="/products">Products</Link> */}
          <Box sx={{ padding: "2em", textAlign: "center" }}>
            <Typography
              variant="h1"
              component="h2"
              align="center"
              sx={{ fontSize: "4rem" }}
            >
              Piese de schimb
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              Piese de schimb pentru aparatele de cafea Jura, DeLonghi, Saeco,
              Nivona, Siemens, Melitta, Philips, Philips-Saeco, Krups, Miele,
              Bosch si Gaggia.
            </Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>
              Alege o marcă:
            </Typography>
          </Box>
          <MarkList items={marks} />
        </Box>
      </Container>
      <LandingPage />
    </>
  );
}

export async function getStaticProps(ctx) {
  const client = new MeiliSearch({
    host: process.env.MEI_HOST,
    apiKey: process.env.MEI_MASTER_KEY,
  });

  const index = client.index("mark");
  await index.updateSettings({
    sortableAttributes: ["name"],
    displayedAttributes: [
      "id",
      "_meilisearch_id",
      "name",
      "models",
      "model_ids",
    ],
  });

  const response = await index.getDocuments({
    limit: 30,
    fields: ["id", "name", "_meilisearch_id"],
  });

  if (!response) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        // statusCode: 301
      },
    };
  }
  return {
    props: { marks: response.results }, // will be passed to the page component as props
    revalidate: 1000000,
  };
}
