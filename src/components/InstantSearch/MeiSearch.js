import "instantsearch.css/themes/satellite.css";
import classes from "./MeiSearch.module.css";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Stats,
  Highlight,
} from "react-instantsearch-dom";
// import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "https://artcafe-meilisearch-production.up.railway.app/",
  "malhnJ9YYTA3BNm5s8hWUOYx9iHOHDhe3v0AQ6KQpg8HkU"
);

import Router from "next/router";
import { DialogTitle } from "@mui/material";

const App = ({ onHit, setQuery, query }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const handleHitClick = (e, slug) => {
    e.preventDefault();
    Router.push(`/products/${slug}`);
    onHit();
    setQuery("");
  };

  const Hit = ({ hit }) => (
    <a
      className={classes.card}
      onClick={(e) => handleHitClick(e, hit.slug)}
      key={hit.id}
      style={{
        maxHeight: "200px",
        overflow: "hidden",
        cursor: "pointer",
        padding: ".5em",
      }}
    >
      <div className="hit-name" style={{ fontWeight: "bold" }}>
        <Highlight attribute="name" hit={hit} />
      </div>
      <div>
        ~<Highlight attribute="sub_category" hit={hit} />~
      </div>
      <div style={{ display: "flex" }}>
        <div className="hit-image">
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
              Preț: <strong>{(hit.price / 100).toFixed(2)} lei</strong>
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
              translations={{
                submitTitle: "Caută.",
                resetTitle: "Resetează căutarea.",
                placeholder: "Caută după denumire, categorie, code, etc",
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

        <InfiniteHits
          translations={{
            loadPrevious: "Reîncarcă cele anterioare",
            loadMore: "Încarcă mai multe",
          }}
          hitComponent={Hit}
        />
      </InstantSearch>
    </div>
  );
};

export default App;
