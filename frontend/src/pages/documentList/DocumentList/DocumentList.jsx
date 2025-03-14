import { Stack } from "@mui/material";
import DocumentSummary from "../DocumentSummary/DocumentSummary";
import styles from "./DocumentList.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// feed of documents (home is documents page)
const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  const { president } = useParams();

  const [tag, setTag] = useState("");

  useEffect(() => {
    const fetchDocumentsForPresident = async () => {
      let target = `/api/document/president/${president}`;
      if (tag !== "") {
        target += `?tag=${tag}`;
      }
      const res = await fetch(target);
      const data = await res.json();
      setDocuments(data.documents);
    };
    fetchDocumentsForPresident();
  }, [president, tag]);

  const Documents = documents.map((doc, i) => {
    return <DocumentSummary key={i} item={doc}></DocumentSummary>;
  });

  const handleTagFilterChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <main className={styles.documentListPage}>
      <FormControl fullWidth>
        <InputLabel>Tag Filter</InputLabel>
        <Select value={tag} label="Tag" onChange={handleTagFilterChange}>
          <MenuItem value=""></MenuItem>
          <MenuItem value="Military">Military</MenuItem>
          <MenuItem value="Immigration">Immigration</MenuItem>
          <MenuItem value="Economics">Economics</MenuItem>
        </Select>
      </FormControl>
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
