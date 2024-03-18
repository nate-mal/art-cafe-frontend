import * as React from "react";

import { MeiliSearch } from "meilisearch";
import { Typography, Grid, LinearProgress, Box } from "@mui/material";
import SimilarProductList from "./SimilarProductList";
import {
  meilisearch_public_key,
  meilisearch_url,
} from "../../../../../lib/settings";
const SimilarProducts = ({ search }) => {
  const [products, setProducts] = React.useState();

  const getSimilarProduct = async (search) => {
    const client = new MeiliSearch({
      host: meilisearch_url,
      apiKey: meilisearch_public_key,
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
