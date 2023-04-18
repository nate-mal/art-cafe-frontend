import Container from "@mui/material/Container";
import { MeiliSearch } from "meilisearch";
import { useRouter } from "next/router";
import Head from "next/head";
import ProductList from "../../src/components/Product/ProductList";
import NextTags from "../../src/components/Product/NextTags";
export default function Home({ result, filterApplied, query }) {
  const router = useRouter();

  // console.log(router.query.search);
  const { estimatedTotalHits, hits, limit, offset } = result;

  const handleSearch = (search) => {
    if (search !== "") {
      router.push({ query: { ...query, search: search } });
    }
  };
  let description =
    "Produse, piese de schimb pentru aparate automate de cafea disponibile.";

  if (filterApplied.mark) {
    description =
      description +
      ` Produse, piese de schimb disponibile pentru marca ${filterApplied.mark.title}.`;
  }
  if (filterApplied.category) {
    description =
      description +
      ` Produse, piese de schimb disponibile pentru categoria ${filterApplied.category.title}.`;
  }
  if (filterApplied.search) {
    description =
      description +
      ` Produse, piese de schimb disponibile pentru cautarea d-voastră: ${filterApplied.search.title}.`;
  }

  return (
    <>
      <Head>
        <title>Art Cafe produse</title>
        <meta name="description" content={description} />

<meta property="og:updated_time" content="1681823297"/>
<meta property="og:title" content={ filterApplied.mark ? `Art Cafe -> ${filterApplied.mark.title}`: "Art Cafe Produse"} />
<meta property="og:description" content={filterApplied.mark ? `Produse disponibile pentru ${filterApplied.mark.title}`:  description} />
<meta property="og:image" itemprop="image" content={filterApplied.mark ? `${process.env.NEXT_PUBLIC_URL}/marks/mark-${filterApplied.mark.id}.png` :  `${process.env.NEXT_PUBLIC_URL}/logo.png`}/>
      </Head>
      <Container maxWidth="lg">
        <NextTags
          query={query}
          options={filterApplied}
          onSearch={handleSearch}
        />
        <ProductList
          key={hits.length}
          total={estimatedTotalHits}
          limit={limit}
          offset={offset}
          query={query}
          products={hits}
        />
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { res } = ctx;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, state-while-revalidate=599"
  );
  const { search, category, categoryName, markMeiId, model, offset, limit } =
    ctx.query;
  const setLimit =
    limit && !isNaN(limit) && +limit > 0 && +limit <= 100 ? +limit : 10;
  const setOffset = offset && !isNaN(offset) && +offset > 0 ? +offset : 0;
  let filter;
  let filterApplied = {};
  const client = new MeiliSearch({
    host: process.env.MEI_HOST,
    apiKey: process.env.MEI_MASTER_KEY,
  });

  // const index = client.index("product");
  if (markMeiId) {
    const markIndex = client.index("mark");
    await markIndex.updateSettings({
      sortableAttributes: ["name"],
      displayedAttributes: ["id", "_meilisearch_id", "name", "models"],
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

    const markData = await markIndex.getDocument(markMeiId, {
      fields: ["id", "_meilisearch_id", "name", "models"],
    });

    if (!markData) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
          // statusCode: 301
        },
      };
    }
    const mark_name = markData.name;
    const mark_id = markData.id;
    const mark_mei_id = markData._meilisearch_id;
    const models_ids = markData.models.map((model) => model.id);
    if (category) {
      filter =
        markMeiId === "mark-1"
          ? `compatible_models_ids = universal AND sub_category_id=${category}`
          : `compatible_models_ids IN [${models_ids.toString()}] AND sub_category_id =${category}`;
    } else {
      filter =
        markMeiId === "mark-1"
          ? `compatible_models_ids = universal`
          : `compatible_models_ids IN [${models_ids.toString()}]`;
    }

    filterApplied.mark = { title: mark_name, mei_id: markMeiId, id: mark_id };
  }
  const index = client.index("product");
  await index.updateSettings({
    filterableAttributes: [
      "sub_category",
      "sub_category_id",
      "compatible_models_ids",
    ],
    sortableAttributes: ["name"],
    displayedAttributes: [
      "id",
      "name",
      "sub_category",
      "sub_category_id",
      "description",
      "price",
      "art_id",
      "slug",
    ],
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

  const result = await index.search(search ? search : "", {
    filter: filter ? filter : undefined,
    limit: setLimit,
    offset: setOffset,
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

  if (category) {
    let title = result.hits.length > 0 ? result.hits[0].sub_category : category;
    if (title === category) {
      title = categoryName ? categoryName : category;
    }
    filterApplied.category = {
      title: title,
      id: category,
    };
  }
  if (search) {
    filterApplied.search = { title: search };
  }

  return {
    props: { result, filterApplied, query: ctx.query }, // will be passed to the page component as props
  };
}
