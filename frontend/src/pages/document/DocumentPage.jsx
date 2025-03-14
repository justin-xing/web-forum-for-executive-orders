import styles from "./DocumentPage.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const DocumentPage = () => {
  const { executive_order_id } = useParams();

  const [document, setDocument] = useState({
    title: "",
    signing_date: "",
    president: "",
  });

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      const res = await fetch(`/api/document/${executive_order_id}`);
      const data = await res.json();
      setDocument(data.document);
    };
    fetchDocumentDetails();
    const fetchComments = async () => {
      const res = await fetch(`/api/comment/comments/${executive_order_id}`);
      const data = await res.json();
      setComments(data.comments);
    };
    fetchComments();
  }, [executive_order_id]);

  const Comments = comments.map((comment, i) => {
    return (
      <div
        key={i}
        style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid" }}
      >
        <div>User: {comment.username}</div>
        <div>Timestamp: {comment.timestamp}</div>
        <div>Message: {comment.message}</div>
        <div>Vote score: {comment.vote_score}</div>
      </div>
    );
  });

  return (
    <div className={styles.documentPage}>
      <div>{executive_order_id}</div>
      <div>{document.title}</div>
      <div>{document.signing_date}</div>
      <div>{document.president}</div>
      <b>Comments</b>
      {Comments}
    </div>
  );
};

export default DocumentPage;
