import axios from "axios";
import strapi from "/lib/api";

export default async function handler(req, res) {
  const productId = req.query.productId;
  const target = req.query.targetQty;
  const location_key = process.env.LOCATION_KEY;
  console.log("run");
  try {
    if (isNaN(target)) {
      throw "not a valid number";
    }

    const location_res = await strapi.get(
      `/api/location?location_key=${location_key}&productId=${productId}`
    );

    const url = location_res.data.vendor_product_location;

    const response = await axios.get(
      `https://check-stock-5tvk24esna-lm.a.run.app/?url=${url}&targetQty=${target}`
    );
    if (response.data.status) res.status(200).json(response.data);
    else throw response.data;
  } catch (err) {
    console.log(err);
    res.status(200).json({ status: "undefined-stock" });
  }
}
