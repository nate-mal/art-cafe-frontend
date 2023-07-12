import { MeiliSearch } from "meilisearch";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { markId, modelId } = req.query;
      const mark = `mark-${markId}`;
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

      // console.log("setoro", set);

      await index.waitForTask(set.taskUid);
      await index.waitForTask(set_2.taskUid);
      await index.waitForTask(set_3.taskUid);
      const tasks = await client.getTasks({
        statuses: ["enqueued", "processing"],
      });
      // console.log("taskotu", tasks);

      const filter =
        mark === "mark-1"
          ? "compatible_models_ids = universal"
          : modelId
          ? `compatible_models_ids IN [${modelId}]`
          : `compatible_models_ids IN [${models_ids.toString()}]`;

      const categories_product = await productsIndex.search("", {
        limit: 2000,
        filter: filter,
        facets: ["sub_category", "sub_category_id"],
      });

      await productsIndex.updateSettings({
        distinctAttribute: null,
      });

      const categories_length = await productsIndex.search("", {
        limit: 0,
        offset: 0,
        filter: filter,
        facets: ["sub_category", "sub_category_id"],
      });

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

      res.status(200).json({
        id: mark_id,
        markMeiId: mark_mei_id,
        name: mark_name,
        estimatedTotalHits: categories_length.estimatedTotalHits,
        categories: categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong!!" });
    }
  } else {
    // Handle any other HTTP method

    res.status(404).json({ categories: [] });
  }
}
