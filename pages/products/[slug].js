import * as React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import useSWR from "swr";
import { backend_url } from "../../lib/settings";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import ProductDetailed from "../../src/components/Product/ProductDetailed/ProductDetailed";
import ProductCarousel from "../../src/components/Product/ProductDetailed/ProductCarousel";
import { DiscountsContext } from "../../context/discounts";
import client from "../../apollo-client";

export default function ProductDetailedPage({ item }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${backend_url}/api/products/${item.id}`,
    fetcher
  );

  const ctxDiscounts = React.useContext(DiscountsContext);
  const individual_discount = data
    ? data.data.attributes.discount
    : item.discount;

  const discount =
    individual_discount ||
    ctxDiscounts.getDiscountPercentage(item.sub_category_id, item.sub_category);

  const price = data ? data.data.attributes.price : item.price;

  const { availability, stock_amount } = item;
  // check availability
  let unavailable_status = null;
  if (availability === "in_stock_in" && (!stock_amount || stock_amount <= 0)) {
    unavailable_status = "sold_out";
  }

  if (
    !["in_stock_ex", "in_stock_in", "undefined_stock", "sold_out"].includes(
      availability
    )
  ) {
    unavailable_status = availability;
  }

  const deliveryInfo =
    "\n*Livrare prin curier rapid national - 29,99 lei (cost fix fara KM taxabili). \n*Livrare gratuita pentru comenzi peste 400 de lei. \n*Vă rugăm să luați în considerare predarea către curier a produselor în 2-5 zile lucratoare pentru produsele marcate cu stoc extern. \n *Comanda minimă este de 100 de RON. Prețurile produselor sunt exprimate în lei și includ TVA. \n*Te ținem la curent cu statusul comenzii printr-un e-mail si/sau sms in momentul in care comanda este finalizată și este predată către curier.  \n*Majoritatea produselor sunt disponibile intr-un depozit logistic in internațional,iar acestea necesită tranzit 2-5 zile,verificare calitativă și ambalare.";
  return (
    <>
      <Head>
        <title>{`Art Cafe ${item.name}`}</title>
        <meta name="description" content={item.description} />
        <meta property="og:title" content={item.name} />
        <meta property="og:description" content={item.description} />
        <meta
          property="og:image"
          itemProp="image"
          content={`${process.env.NEXT_PUBLIC_URL}/images/${item.art_id}/image-0.jpg`}
        />
        <meta property="og:updated_time" content="1681823297" />
      </Head>
      <Container maxWidth="lg" style={{ minHeight: "100vh" }}>
        <Grid container spacing={4} sx={{ marginTop: "5em" }}>
          <Grid item xs={12} md={6} style={{ position: "relative" }}>
            {discount && (
              <Typography
                variant="body1"
                sx={(theme) => ({
                  padding: ".5em",
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: theme.palette.secondary.main,
                  color: "#fff",
                  borderRadius: "5px",
                  zIndex: 999,
                })}
              >
                -{discount} %
              </Typography>
            )}
            {unavailable_status && (
              <Typography
                variant="body1"
                sx={(theme) => ({
                  fontSize: "1.2rem",
                  padding: ".5em",
                  position: "absolute",
                  top: 100,
                  right: 100,
                  background: theme.palette.primary.main,
                  color: "#fff",
                  borderRadius: "5px",
                  zIndex: 10,
                })}
              >
                {unavailable_status === "sold_out"
                  ? "Stoc epuizat"
                  : "Indisponibil"}
              </Typography>
            )}
            <ProductCarousel
              art_id={item.art_id}
              imgNr={item.imgNr}
              name={item.name}
              images={item.images}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductDetailed
              item={{
                ...item,
                price,
                discount,
                deliveryInfo,
                unavailable_status,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Products {
        products(
          pagination: { pageSize: 50 }
          filters: { price: { gte: 40000 } }
        ) {
          data {
            id
            attributes {
              slug
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
            }
          }
        }
      }
    `,
  });
  const response = data.products.data;
  const paths = response.map((item) => {
    return {
      params: {
        slug: item.attributes.slug,
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps(ctx) {
  //   console.log(ctx.params);
  const { slug } = ctx.params;

  const { data } = await client.query({
    query: gql`
      query Products {
        products(
          filters: {
            slug: { eq: "${slug}" }
          }
        ) {
          data {
            id
            attributes {
              art_id
              name
              slug
              description
              price
              images_nr
              discount
              availability
              stock_amount
              images {
                data {
                  attributes {
                    provider
                    url
                    provider_metadata
                  }
                }
              }
              compatible_models {
                data {
                  id
                  attributes {
                    name
                    mark {
                      data {
                        id
                        attributes {
                          name
                        }
                      }
                    }
                  }
                }
              }
              sub_category {
                data {
                  id
                  attributes {
                    ro_name
                    main_category {
                      data {
                        id
                        attributes {
                          ro_name
                          principal_category {
                            data {
                              attributes {
                                ro_name
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
            }
          }
        }
      }
    `,
  });
  const response = data.products.data[0];
  if (!response) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        // statusCode: 301
      },
    };
  }
  let compatible_models = response.attributes.compatible_models;

  if (
    compatible_models.data &&
    Array.isArray(compatible_models.data) &&
    compatible_models.data.length > 0
  ) {
    compatible_models = compatible_models.data.map((modelData) => {
      return {
        id: modelData.id,
        name: modelData.attributes.name,
        markId: modelData.attributes.mark.data.id,
        markName: modelData.attributes.mark.data.attributes.name,
      };
    });
    compatible_models = compatible_models.reduce(
      (accumulator, currentValue) => {
        // Check if the markName already exists in the accumulator array
        const existingMark = accumulator.find(
          (item) => item.markName === currentValue.markName
        );

        // If the markName doesn't exist, create a new object and add it to the accumulator array
        if (!existingMark) {
          accumulator.push({
            markName: currentValue.markName,
            markId: currentValue.markId,
            models: [
              {
                id: currentValue.id,
                name: currentValue.name,
                markId: currentValue.markId,
              },
            ],
          });
        } else {
          // If the markName already exists, add the current object to the "models" array
          existingMark.models.push({
            id: currentValue.id,
            name: currentValue.name,
            markId: currentValue.markId,
          });
        }

        return accumulator;
      },
      []
    );
  }
  const images =
    response.attributes.images &&
    response.attributes.images.data &&
    response.attributes.images.data.length > 0
      ? response.attributes.images.data.map((im) => ({
          url: im.attributes.url,
          id: im.attributes.provider_metadata.public_id,
          provider: im.attributes.provider,
        }))
      : [];

  const item = {
    id: response.id,
    name: response.attributes.name,
    slug: response.attributes.slug,
    art_id: response.attributes.art_id,
    price: response.attributes.price,
    discount: response.attributes.discount,
    availability: response.attributes.availability,
    stock_amount: response.attributes.stock_amount,
    description: response.attributes.description,
    imgNr: response.attributes.images_nr,
    compatible_models: compatible_models,
    sub_category: response.attributes.sub_category.data.attributes.ro_name,
    sub_category_id: response.attributes.sub_category.data.id,
    images,
  };

  return {
    props: {
      item,
    }, // will be passed to the page component as props
    revalidate: 100000,
  };
}
