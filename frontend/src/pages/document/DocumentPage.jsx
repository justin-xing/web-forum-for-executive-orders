import styles from "./DocumentPage.module.css";
import { useParams } from "react-router-dom";

const DocumentPage = () => {
  const { executive_order_id } = useParams();

  // do api call using executive_order_id, render data

  return <div class={styles.documentPage}>{executive_order_id}</div>;
};

export default DocumentPage;
