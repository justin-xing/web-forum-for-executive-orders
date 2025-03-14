import { Button } from "@mui/material";

const DocumentSummary = ({ item }) => {
  const { title, signing_date, president } = item;
  return (
    <Button variant="outlined" sx={{ border: 1, display: "flex", gap: 10 }}>
      <div>{title}</div>
      <div>{signing_date}</div>
      <div>{president}</div>
    </Button>
  );
};

export default DocumentSummary;
