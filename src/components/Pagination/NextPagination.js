import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
export default function NextPagination(props) {
  const { total, limit, offset, query } = props;
  const router = useRouter();
  const page =
    offset && !isNaN(offset) && offset > 0
      ? parseInt(offset / limit + 1, 10)
      : 1;

  console.log(page);
  const [count, setCount] = React.useState(
    limit && !isNaN(limit) && limit > 0 ? parseInt(limit, 10) : 10
  );
  const handleChange = (event, value) => {
    router.push({
      query: { ...query, offset: value ? (value - 1) * limit : 0 },
    });
  };
  const handleChangeCount = (event) => {
    const count = parseInt(event.target.value, 10);
    setCount(count);
    router.push({
      query: { ...query, offset: 0, limit: count },
    });
  };

  return (
    <Grid container direction="column" sx={{ marginBottom: "1em" }}>
      <Grid item container justifyContent="end">
        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          onPageChange={(event, value) => handleChange(event, value + 1)}
          rowsPerPage={count}
          labelRowsPerPage="Show:"
          onRowsPerPageChange={handleChangeCount}
        />
      </Grid>
      {props.children}
      <Grid item container justifyContent="center" sx={{ marginTop: "1em" }}>
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination
            count={parseInt(total / limit) + 1}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
