import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Link from "../../Link";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Search from "../ui/Search";
export default function NextTags(props) {
  const { mark, category, search } = props.options;
  const onSearch = props.onSearch;
  const query = props.query;

  return (
    <Grid container direction="column">
      {mark && (
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "2em", textAlign: "center" }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Produse disponibile pentru {mark.title}
          </Typography>
          <Image
            src={`/marks/mark-${mark.id}.png`}
            alt={mark.title}
            width={200}
            height={100}
            style={{ objectFit: "scale-down", fontWeight: "bolder" }}
          />
          <Button
            varint="contained"
            component={Link}
            href={`/${query.markMeiId}`}
          >
            <KeyboardReturnIcon />
            {category ? "Schimbă categoria" : "Selectează categorie"}
          </Button>
        </Grid>
      )}
      <Grid item container justifyContent="start">
        {category && (
          <Grid item container alignItems="center" sx={{ margin: "1em" }} md>
            <Typography variant="body2" component="div">
              Categorie:
            </Typography>

            <Card
              sx={{
                position: "relative",
                padding: ".5em",
                marginLeft: "1em",
                overflow: "visible",
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "1.2rem" }}
              >
                {category.title}
              </Typography>
              <Link
                href={{ query: { ...query, category: undefined } }}
                sx={{
                  position: "absolute",
                  top: "-15px",
                  right: "-10px",
                }}
              >
                <CancelIcon fontSize="large" />
              </Link>
            </Card>
          </Grid>
        )}
        {search ? (
          <Grid item container alignItems="center" sx={{ margin: "1em" }} md>
            <Typography variant="body2" component="div">
              Căutare:
            </Typography>

            <Card
              sx={{
                position: "relative",
                padding: ".5em",
                marginLeft: "1em",
                overflow: "visible",
              }}
            >
              <Typography
                variant="div"
                component="body1"
                sx={{ fontSize: "1.2rem" }}
              >
                {search.title}
              </Typography>
              <Link
                href={{ query: { ...query, search: undefined } }}
                sx={{
                  position: "absolute",
                  top: "-15px",
                  right: "-10px",
                }}
              >
                <CancelIcon fontSize="large" />
              </Link>
            </Card>
          </Grid>
        ) : (
          <Grid item container alignItems="center" sx={{ margin: "1em" }} md>
            <Search onSearch={onSearch} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
