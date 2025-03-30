import styles from "./DocumentPage.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAuth } from "../../context/AuthContext";

const DocumentPage = () => {
  const { executive_order_id } = useParams();
  const { user } = useAuth();

  const [document, setDocument] = useState({
    title: "",
    signing_date: "",
    president: "",
    link: "",
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

  const deleteComment = async (cid) => {
    await fetch(`/api/comment/delete/${cid}`, {
      method: "DELETE",
    });
    const updatedComments = comments.filter((comment) => comment.cid !== cid);
    setComments(updatedComments);
  };

  const Comments = comments.map((comment, i) => {
    return (
      <div
        key={i}
        style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid" }}
        className="flex justify-between items-center p-2"
      >
        <div>
          <div>User: {comment.username}</div>
          <div>Timestamp: {comment.timestamp}</div>
          <div>Message: {comment.message}</div>
          <div>Vote score: {comment.vote_score}</div>
        </div>
        {user && user.role === "admin" && (
          <div>
            <button
              className="hover:cursor-pointer"
              onClick={() => deleteComment(comment.cid)}
            >
              <HighlightOffIcon />
            </button>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={styles.documentPage}>
      <div>EID: {executive_order_id}</div>
      <div>Title: {document.title}</div>
      <div>Signing Date: {document.signing_date}</div>
      <div>
        PDF: <a href={document.pdf_url}>{document.pdf_url}</a>
      </div>
      <div>Signed By: {document.president}</div>
      <b>Comments</b>
      {Comments}
    </div>
  );
};

export default DocumentPage;
