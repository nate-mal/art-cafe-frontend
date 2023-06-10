import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CategoryList from "../../src/components/Category/CategoryList";
import Image from "next/image";
import Head from "next/head";
import { MeiliSearch } from "meilisearch";

export default function Categories({ results }) {
  // console.log(results);
  const { id, markMeiId, name, estimatedTotalHits, categories } = results;
  console.log(categories);
  const image_path = `/marks/mark-${id}.png`;
  return (
    <>
      <Head>
        <title>{`Art Cafe ${name}`}</title>
        <meta
          name="description"
          content={`Categorii de piese de schimb disponibile pentru ${name}`}
        />

        <meta property="og:updated_time" content="1681823297" />
        <meta property="og:title" content={`Art Cafe ${name}`} />
        <meta
          property="og:description"
          content={`Categorii de piese de schimb disponibile pentru ${name}`}
        />
        <meta
          property="og:image"
          itemprop="image"
          content={`${process.env.NEXT_PUBLIC_URL}/${image_path}`}
        />
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2em", textAlign: "center" }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Categorii disponibile pentru {name}
            </Typography>
            <Image
              src={image_path}
              alt={name}
              width={200}
              height={100}
              style={{ objectFit: "scale-down", fontWeight: "bolder" }}
            />
          </Grid>
          <CategoryList
            markMeiId={markMeiId}
            estimatedTotalHits={estimatedTotalHits}
            items={categories}
          />
        </Box>
      </Container>
    </>
  );
}
export async function getStaticPaths() {
  const client = new MeiliSearch({
    host: process.env.MEI_HOST,
    apiKey: process.env.MEI_MASTER_KEY,
  });

  const index = client.index("mark");
  await index.updateSettings({
    sortableAttributes: ["name"],
    displayedAttributes: ["id", "name", "_meilisearch_id"],
  });

  const result = await index.getDocuments({
    limit: 100,
    fields: ["_meilisearch_id"],
  });
  const paths = result.results.map((mark) => {
    return {
      params: {
        mark: mark._meilisearch_id,
      },
    };
  });
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(ctx) {
  const { mark } = ctx.params;

  const client = new MeiliSearch({
    host: process.env.MEI_HOST,
    apiKey: process.env.MEI_MASTER_KEY,
  });

  const index = client.index("mark");
  await index.updateSettings({
    sortableAttributes: ["name"],
    displayedAttributes: ["id", "_meilisearch_id", "name", "models"],
  });

  const result = await index.getDocument(mark, {
    fields: ["id", "_meilisearch_id", "name", "models"],
  });

  if (!result) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        // statusCode: 301
      },
    };
  }
  const mark_name = result.name;
  const mark_id = result.id;
  const mark_mei_id = result._meilisearch_id;
  const models_ids = result.models.map((model) => model.id);

  const productsIndex = client.index("product");

  const set = await productsIndex.updateSettings({
    filterableAttributes: [
      "compatible_models_ids",
      "sub_category",
      "sub_category_id",
    ],
    distinctAttribute: "sub_category",
  });

  const set_2 = await productsIndex.updateSettings({
    distinctAttribute: "sub_category_id",
  });
  const set_3 = await productsIndex.updateSettings({
    distinctAttribute: "sub_category",
  });

  // do {
  //   const tasks = await client.getTasks({
  //     statuses: ["enqueued", "processing"],
  //   });
  //   const results = tasks.results;
  //   // 150ms
  //   if (results.length > 0) break;

  //   await new Promise((resolve) => setTimeout(resolve, 150));
  // } while (true);
  console.log("setoro", set);

  await index.waitForTask(set.taskUid);
  await index.waitForTask(set_2.taskUid);
  await index.waitForTask(set_3.taskUid);
  const tasks = await client.getTasks({
    statuses: ["enqueued", "processing"],
  });
  console.log("taskotu", tasks);

  const filter =
    mark === "mark-1"
      ? "compatible_models_ids = universal"
      : `compatible_models_ids IN [${models_ids.toString()}]`;

  const categories_product = await productsIndex.search("", {
    limit: 2000,
    filter: filter,
    facets: ["sub_category", "sub_category_id"],
  });

  if (!categories_product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        // statusCode: 301
      },
    };
  }
  await productsIndex.updateSettings({
    distinctAttribute: null,
  });
  // do {
  //   const tasks = await client.getTasks({
  //     statuses: ["enqueued", "processing"],
  //   });
  //   const results = tasks.results;
  //   // 150ms
  //   if (results.length > 0) break;

  //   await new Promise((resolve) => setTimeout(resolve, 150));
  // } while (true);

  const categories_length = await productsIndex.search("", {
    limit: 0,
    offset: 0,
    filter: filter,
    facets: ["sub_category", "sub_category_id"],
  });

  if (!categories_length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  const cat_name_ex_art_ids = {};

  categories_product.hits.map((item) => {
    if (!cat_name_ex_art_ids[item.sub_category_id]) {
      cat_name_ex_art_ids[item.sub_category_id] = {
        name: item.sub_category,
        ex_art_id: item.art_id,
        ex_thumbnail_url:
          item.pictures && item.pictures[0]
            ? item.pictures[0].thumbnail_url
            : "https://ik.imagekit.io/artcafe/Product-Image-Coming-Soon.png",
      };
    }
  });

  const categories_ids = Object.keys(
    categories_length.facetDistribution.sub_category_id
  );

  const products_estimatedTotalHits = Object.values(
    categories_length.facetDistribution.sub_category_id
  );
  const categories = categories_ids.slice(0, 100).map((id, index) => {
    return {
      id,
      estimatedTotalHits: products_estimatedTotalHits[index],
      ...cat_name_ex_art_ids[id],
    };
  });

  // check length
  console.log(mark_name, "(producs): ", categories_product.hits.length);
  console.log(mark_name, "(categories): ", categories_ids.length);

  return {
    props: {
      results: {
        id: mark_id,
        markMeiId: mark_mei_id,
        name: mark_name,
        estimatedTotalHits: categories_length.estimatedTotalHits,
        categories: categories,
      },
    }, // will be passed to the page component as props
    revalidate: 700000,
  };
}
