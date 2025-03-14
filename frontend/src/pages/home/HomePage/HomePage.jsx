import { Stack } from "@mui/material";
import DocumentSummary from "../DocumentSummary/DocumentSummary";
import styles from "./HomePage.module.css";

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
const HomePage = () => {
  const DocumentList = DOCUMENTS.map((doc) => {
    return <DocumentSummary item={doc}></DocumentSummary>;
  });
  return (
    <main class={styles.homePage}>
      <Stack
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {DocumentList}
      </Stack>
    </main>
  );
};

export default HomePage;
