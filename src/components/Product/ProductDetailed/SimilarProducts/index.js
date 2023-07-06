import * as React from "react";

import { MeiliSearch } from "meilisearch";
import { Typography, Grid, LinearProgress, Box } from "@mui/material";
import SimilarProductList from "./SimilarProductList";

const SimilarProducts = ({ search }) => {
  const [products, setProducts] = React.useState();

  const getSimilarProduct = async (search) => {
    const client = new MeiliSearch({
      host: "https://artcafe-meilisearch-production.up.railway.app/",
      apiKey:
        "6d90112e1da3ec2f49ed432d45e40092300c47997776f1bdd5e00a184f2e286a",
    });
    const index = client.index("product");
    const result = await index.search(search, {
      limit: 15,
      offset: 0,
    });
    setProducts(result.hits);
    console.log(result.hits);
  };

  React.useEffect(() => {
    getSimilarProduct(search);
  }, []);

  return (
    <Grid item sx={{ marginTop: "10em" }}>
      <Typography variant="h3">Produse Similare</Typography>
      {products && <SimilarProductList products={products} />}
      {!products && (
        <Box sx={{ width: "100%", marginTop: "5em" }}>
          <LinearProgress />
        </Box>
      )}
    </Grid>
  );
};

export default SimilarProducts;
