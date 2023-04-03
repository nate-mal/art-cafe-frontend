import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      Art Cafe {new Date().getFullYear()}.
    </Typography>
  );
}
