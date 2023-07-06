import ModelList from "./ModelList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageKit from "../../../../ImageKit";
export default function ModelGroups({ groups }) {
  if (groups && groups.length > 0)
    return (
      <Box sx={{ marginTop: "2em" }}>
        <Typography variant="h4" component="h4">
          Modele de aparate compatibile
        </Typography>
        {groups.map((group) => (
          <Box key={group.markId} sx={{ marginTop: "1em" }}>
            <ImageKit
              src={group.markPicture.url.substring(
                group.markPicture.url.lastIndexOf("/") + 1
              )}
              alt={`logo picture pentru marca de aparate ${group.markName}`}
              width={150}
              height={100}
              style={{
                objectFit: "scale-down",
                fontWeight: "bolder",
              }}
            />
            <ModelList items={group.models}></ModelList>
          </Box>
        ))}
      </Box>
    );
}
