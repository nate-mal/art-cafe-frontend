import axios from "axios";
import strapi from "/lib/api";

const checkInternStock = async (productId, targetQty, product) => {
  const stock_amount = product.data.attributes.stock_amount;
  if (stock_amount <= 0) {
    return { status: "sold-out" };
  }

  switch (true) {
    case targetQty <= stock_amount:
      return { status: "in-stock" };
      break;
    case targetQty > stock_amount:
      return { status: "out-of-stock", max: stock_amount };
      break;
    default:
      return { status: "undefined-stock" };
  }
};

const checkExternStock = async (productId, target) => {
  const location_key = process.env.LOCATION_KEY;

  const location_res = await strapi.get(
    `/api/location?location_key=${location_key}&productId=${productId}`
  );

  const url = location_res.data.vendor_product_location;

  const response = await axios.get(
    `https://check-stock-5tvk24esna-lm.a.run.app/?url=${url}&targetQty=${target}`
  );

  if (response.data.status) return response.data;
  else throw response.data;
};

export default async function handler(req, res) {
  const productId = req.query.productId;
  const target = req.query.targetQty;
  console.log("run");
  try {
    if (isNaN(target)) {
      throw "not a valid number";
    }

    console.log("target", target);
    const findProduct = await strapi.get(`/api/products/${productId}`);

    const product = findProduct.data;

    const stock_intern = await checkInternStock(productId, target, product);
    const availability = product.data.attributes.availability;
    if (availability === "in-stock-in") {
      res.status(200).json({ ...stock_intern, location: "intern" });
      return;
    } else if (availability === "undefined-stock") {
      if (target > 10) {
        res
          .status(200)
          .json({ status: "out-of-stock", max: 10, location: "intern" });
      } else {
        res.status(200).json({ status: "undefined-stock", location: "intern" });
      }
      return;
    } else if (availability !== "in-stock-ex" && availability !== "sold-out") {
      res.status(200).json({ status: availability, location: "intern" });
      return;
    }

    let stock = {};

    if (stock_intern.status !== "in-stock" && target > 999) {
      res.status(200).json({ status: "out-of-stock", location: "extern" });
      return;
    }

    switch (stock_intern.status) {
      case "in-stock":
        stock = { status: "in-stock", location: "intern" };
        break;
      case "out-of-stock":
        const stock_extern_add = await checkExternStock(
          productId,
          target - stock_intern.max
        );
        if (stock_extern_add.status === "in-stock") {
          stock = { status: "in-stock", location: "intern-extern" };
        } else if (stock_extern_add.status === "out-of-stock") {
          stock = {
            status: "out-of-stock",
            max: stock_intern.max + stock_extern_add.max,
            location: "intern-extern",
          };
        } else stock = { ...stock_intern, location: "intern" };

        break;
      default:
        const stock_extern = await checkExternStock(productId, target);
        stock = { ...stock_extern, location: "extern" };
        break;
    }

    res.status(200).json(stock);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      res
        .status(404)
        .json({ status: "unavailable", message: "Product_Not_Found" });
      return;
    }
    console.log("err", err);
    res.status(200).json({ status: "unavailable" });
  }
}
