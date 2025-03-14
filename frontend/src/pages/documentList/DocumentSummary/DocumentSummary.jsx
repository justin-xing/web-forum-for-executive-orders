import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const DocumentSummary = ({ item }) => {
  const { executive_order_id, title, signing_date, president } = item;
  return (
    <Link to={`/document/${executive_order_id}`}>
      <Button variant="outlined" sx={{ border: 1, display: "flex", gap: 10 }}>
        <div>{title}</div>
        <div>{signing_date}</div>
        <div>{president}</div>
      </Button>
    </Link>
  );
};

export default DocumentSummary;
