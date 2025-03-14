import { Stack } from "@mui/material";
import DocumentSummary from "../DocumentSummary/DocumentSummary";
import styles from "./DocumentList.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// feed of documents (home is documents page)
const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  const { president } = useParams();

  useEffect(() => {
    const fetchDocumentsForPresident = async () => {
      const res = await fetch(`/api/document/president/${president}`);
      const data = await res.json();
      setDocuments(data.documents);
    };
    fetchDocumentsForPresident();
  }, [president]);

  const Documents = documents.map((doc, i) => {
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
