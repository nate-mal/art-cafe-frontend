import ImageGallery from "react-image-gallery";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
const images = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
  return {
    original: `/reparogallery/image-${index + 1}.png`,
    thumbnail: `/reparogallery/image-${index + 1}.png`,
  };
});

export default function Gallery() {
  return (
    <Grid item sx={{ marginBottom: "3em" }}>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        sx={{ paddingBottom: "1em" }}
      >
        De prin atelier
      </Typography>
      <Container maxWidth="md">
        <ImageGallery items={images} />
      </Container>
    </Grid>
  );
}
