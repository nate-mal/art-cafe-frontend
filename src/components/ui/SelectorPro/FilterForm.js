import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AsyncAutocomplete from "./AsyncAutocomplete.js";
import client from "../../../../apollo-client.js";
import { gql } from "@apollo/client";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "../../../Link.js";
const reducer = (state, action) => {
  switch (action.type) {
    case "select_mark":
      return {
        mark: action.value,
        model: { name: "", id: null },
        category: { name: "", id: null },
      };

    case "select_model":
      return {
        ...state,
        category: { name: "", id: null },
        model: action.value,
      };

    case "select_category":
      return { ...state, category: action.value };
  }
};

export default function FilterForm(props) {
  const [marks, setMarks] = React.useState([]);
  const [models, setModels] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loadingModels, setLoadingModels] = React.useState(false);
  const [loadingMarks, setLoadingMarks] = React.useState(false);
  const [loadingCategories, setLoadingCategories] = React.useState(false);
  const [filter, dispatchFilter] = React.useReducer(reducer, {
    mark: { name: "", id: null },
    model: { name: "", id: null },
    category: { name: "", id: null },
  });

  const fetchMarks = async () => {
    setLoadingMarks(true);
    const { data } = await client.query({
      query: gql`
        query {
          marks(pagination: { pageSize: 500 }) {
            data {
              id
              attributes {
                name
                picture {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });
    const formatedData = data.marks.data.map((entry) => ({
      id: entry.id,
      name: entry.attributes.name,
      picture: entry.attributes.picture.data.attributes.url,
    }));
    setLoadingMarks(false);
    setMarks(formatedData);
  };
  const fetchModels = async (mark_id) => {
    setLoadingModels(true);
    const { data } = await client.query({
      query: gql`
          query {
            models(
              filters: { mark: { id: { eq: ${mark_id} } } }
              pagination: { pageSize: 1000 }
            ) {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
        `,
    });
    const formatedData = data.models.data.map((entry) => ({
      id: entry.id,
      name: entry.attributes.name,
    }));
    setLoadingModels(false);
    setModels(formatedData);
  };
  const fetchCategories = async (mark_id, model_id) => {
    setLoadingCategories(true);

    const response = await axios.get(
      `/api/categories?markId=${mark_id}${
        model_id ? `&modelId=${model_id}` : ""
      }`
    );

    console.log(response);

    setLoadingCategories(false);
    if (response.status === 200) {
      const categories = response.data.categories.map((item) => ({
        ...item,
        picture: item.ex_thumbnail_url,
      }));
      setCategories(categories);
    }
  };
  React.useEffect(() => {
    fetchMarks();
  }, []);
  React.useEffect(() => {
    if (filter.mark.id) {
      fetchModels(filter.mark.id);
    }
  }, [filter.mark.id]);

  React.useEffect(() => {
    if (filter.mark.id && filter.model.id) {
      fetchCategories(filter.mark.id, filter.model.id);
    } else if (filter.mark.id) {
      fetchCategories(filter.mark.id);
    }
  }, [filter.mark.id, filter.model.id]);

  return (
    <React.Fragment>
      <Grid container justifyContent="center">
        <Grid
          item
          container
          direction="column"
          spacing={3}
          alignItems="center"
          component={Paper}
          style={{
            margin: 0,
            padding: "1.5em",
            maxWidth: "50em",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            textAlign="center"
            style={{ marginBottom: "1em" }}
          >
            Caută o piesă
          </Typography>

          <AsyncAutocomplete
            value={filter.mark}
            options={marks}
            loading={loadingMarks}
            onSelected={(value) =>
              dispatchFilter({ type: "select_mark", value })
            }
            label="Marcă"
            noOptionsText="Fără opțiuni"
          />

          <AsyncAutocomplete
            value={filter.model}
            options={models}
            loading={loadingModels}
            onSelected={(value) =>
              dispatchFilter({ type: "select_model", value })
            }
            label="Model"
            noOptionsText="Fără opțiuni, alege o marcă"
          />

          <AsyncAutocomplete
            value={filter.category}
            options={categories}
            loading={loadingCategories}
            onSelected={(value) =>
              dispatchFilter({ type: "select_category", value })
            }
            label="Categorie"
            noOptionsText="Fără opțiuni, alege o marcă"
          />

          <Button
            variant="contained"
            component={Link}
            disabled={!filter.mark.id}
            href={`/products?markMeiId=mark-${filter.mark.id}${
              filter.category.id
                ? `&category=${filter.category.id}&categoryName=${filter.category.name}`
                : ""
            }${
              filter.model.id
                ? `&model=${filter.model.id}&modelName=${filter.model.name}`
                : ""
            }`}
            sx={(theme) => ({
              ...theme.typography.estimate,
              borderRadius: 50,
              hieght: 80,
              width: "fit-content",
              backgroundColor: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.secondary.light,
              },
              fontsize: "1.5rem",
              marginTop: "2em",
              fontFamily: "Roboto, sans-serif",
            })}
            onClick={props.onSearch ? props.onSearch : () => {}}
          >
            CAUTĂ
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
