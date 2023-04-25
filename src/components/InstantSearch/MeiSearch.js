import "instantsearch.css/themes/satellite.css";
import classes from "./MeiSearch.module.css";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { DiscountsContext } from "../../../context/discounts";
import { useTheme } from "@emotion/react";
import {
  InstantSearch,
  SearchBox,
  Stats,
  Highlight,
  createInfiniteHitsSessionStorageCache,
  connectInfiniteHits,
} from "react-instantsearch-dom";
// import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "https://artcafe-meilisearch-production.up.railway.app/",
  "6d90112e1da3ec2f49ed432d45e40092300c47997776f1bdd5e00a184f2e286a"
);
const sessionStorageCache = createInfiniteHitsSessionStorageCache();

import Router from "next/router";

const App = ({ onHit, setQuery, query }) => {
  const ctxDiscounts = React.useContext(DiscountsContext);
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const handleHitClick = (e, slug) => {
    e.preventDefault();
    Router.push(`/products/${slug}`);
    onHit();
    setQuery("");
  };

  const Hit = ({ hit }) => {
    const discount =
      hit.discount ||
      ctxDiscounts.getDiscountPercentage(hit.sub_category_id, hit.sub_category);
    return (
      <a
        className={classes.card}
        onClick={(e) => handleHitClick(e, hit.slug)}
        key={hit.id}
        style={{
          maxHeight: "200px",
          overflow: "hidden",
          cursor: "pointer",
          padding: ".5em",
          marginBottom: ".5em",
          userSelect: "none",
        }}
      >
        <div className="hit-name" style={{ fontWeight: "bold" }}>
          <Highlight attribute="name" hit={hit} />
        </div>
        <div>
          ~<Highlight attribute="sub_category" hit={hit} />~
        </div>
        <div style={{ display: "flex" }}>
          <div className="hit-image" style={{ position: "relative" }}>
            {discount && (
              <span
                style={{
                  fontSize: ".7rem",
                  padding: "2px",
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "#f6a118",
                  color: "#fff",
                  borderRadius: "5px",
                }}
              >
                -{discount} %
              </span>
            )}
            <img
              src={`/images/${hit.art_id}/image-0.jpg`}
              alt={hit.name}
              width="100px"
              style={{ padding: "1em" }}
            />
          </div>
          <div>
            <div
              className="hit-description"
              style={{
                display: "block",
                textOverflow: "ellipsis",
                wordWrap: "break-word",
                overflow: "hidden",
                maxHeight: "3.6em",
                lineHeight: "1.8em",
              }}
            >
              <Highlight attribute="description" hit={hit} />
            </div>
            <span>...</span>
            <div style={{ display: matchesSM ? "" : "flex" }}>
              <div>
                Preț:{" "}
                <strong
                  style={{ textDecoration: discount ? "line-through" : "" }}
                >
                  {(hit.price / 100).toFixed(2)} lei
                </strong>{" "}
                {discount && (
                  <strong style={{ marginLeft: ".5em", color: "#f6a118" }}>
                    {(
                      Math.round(
                        hit.price - Math.ceil(hit.price * (discount / 100))
                      ) / 100
                    ).toFixed(2)}{" "}
                    lei
                  </strong>
                )}
              </div>
              <div style={{ marginLeft: "auto" }}>
                Cod:
                <strong>
                  <Highlight attribute="art_id" hit={hit} />
                </strong>
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  };
  const InfiniteHits = ({ hits, hasMore, refineNext }) => (
    <>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {hits.map((hit) => {
          return (
            <li key={`${hit.id}-${hit.art_id}`}>
              <Hit hit={hit} />
            </li>
          );
        })}
      </ul>
      <div>
        {hits.length === 0 ? (
          <Typography variant="body1" align="center">
            {" "}
            Nu am găsit niciun produs <SentimentDissatisfiedIcon />
          </Typography>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Typography variant="body1" align="center">
              {hits.length}
              {hits.length === 1 ? " produs încărcat" : " produse încărcate"}
            </Typography>
            <Button
              variant="outlined"
              onClick={refineNext}
              disabled={!hasMore}
              style={{ textTransform: "none" }}
            >
              Încarcă mai multe
            </Button>
          </div>
        )}
      </div>
    </>
  );
  const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);
  return (
    <div className="ais-InstantSearch">
      <div style={{ width: "100vw", maxWidth: "600px" }}></div>

      <InstantSearch indexName="product" searchClient={searchClient}>
        <>
          <div
            style={{
              position: "fixed",
              top: 5,
              zIndex: 99999,
              width: "90vw",
              maxWidth: "500px",
            }}
          >
            {query.length > 0 ? (
              <div
                style={{
                  background: "#fff",
                  width: "fit-content",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <Stats />
              </div>
            ) : (
              <div style={{ height: "20px" }} />
            )}
            <SearchBox
              autoFocus={true}
              translations={{
                submitTitle: "Caută.",
                resetTitle: "Resetează căutarea.",
                placeholder: "Caută după denumire, categorie, cod, etc",
              }}
              onChange={(event) => {
                event.preventDefault();
                setQuery(event.currentTarget.value);
              }}
              onReset={(event) => {
                event.preventDefault();
                setQuery("");
              }}
            />
          </div>
          <Typography
            variant="h6"
            style={{
              marginBottom: ".5em",
              paddingBottom: 0,
              marginTop: matchesSM ? "75px" : "50px",
            }}
          >
            Caută cu viteza luminii:
            <span style={{ fontSize: "16px" }}>&#128526;</span>
          </Typography>
        </>

        <CustomInfiniteHits
          translations={{
            loadPrevious: "Reîncarcă cele anterioare",
            loadMore: "Încarcă mai multe",
          }}
          // hitComponent={Hit}
          cache={sessionStorageCache}
        />
      </InstantSearch>
    </div>
  );
};

export default App;
