import { Stack } from "@mui/material";
import DocumentSummary from "../DocumentSummary/DocumentSummary";
import styles from "./DocumentList.module.css";

// REPLACE: request query that filter documents for president
const DOCUMENTS = [
  {
    executive_order_id: 1,
    title: "bill 1",
    signing_date: "YYYY-MM-DD",
    president: "uncle sam",
  },
  {
    executive_order_id: 1,
    title: "bill 2",
    signing_date: "YYYY-MM-DD",
    president: "uncle sam",
  },
  {
    executive_order_id: 1,
    title: "bill 3",
    signing_date: "YYYY-MM-DD",
    president: "uncle sam",
  },
];

// feed of documents (home is documents page)
const DocumentList = () => {
  const Documents = DOCUMENTS.map((doc, i) => {
    return <DocumentSummary key={i} item={doc}></DocumentSummary>;
  });
  return (
    <main className={styles.documentListPage}>
      <Stack
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {Documents}
      </Stack>
    </main>
  );
};

export default DocumentList;
