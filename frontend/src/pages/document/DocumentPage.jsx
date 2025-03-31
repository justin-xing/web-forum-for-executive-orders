import styles from "./DocumentPage.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useAuth } from "../../context/AuthContext";
import CommentInput from "./CommentInput";

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
  const [pdfUrl, setPdfUrl] = useState(null);

  const fetchDocumentDetails = async () => {
    const res = await fetch(`/api/document/${executive_order_id}`);
    const data = await res.json();
    setDocument(data.document);
    fetchPDF(data.document.pdf_url);
  };

  const fetchComments = async () => {
    const res = await fetch(`/api/comment/comments/${executive_order_id}`);
    const data = await res.json();
    setComments(data.comments);
  };

  const fetchPDF = async (url) => {
    if (url) {
      const res = await fetch(`/api/document/pdfproxy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
      const blob = await res.blob();
      const fileURL = URL.createObjectURL(blob);
      setPdfUrl(fileURL);
    }
  };

  useEffect(() => {
    fetchDocumentDetails();
    fetchComments();
  }, [executive_order_id]);

  const deleteComment = async (cid) => {
    await fetch(`/api/comment/comments/${cid}`, {
      method: "DELETE",
    });
    const updatedComments = comments.filter((comment) => comment.cid !== cid);
    setComments(updatedComments);
  };

  const vote = async (vote, uid, cid) => {
    await fetch("/api/vote/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vote,
        uid,
        cid,
      }),
    });
    fetchComments();
  };

  const Comments = comments.map((comment, i) => (
    <div
      key={i}
      style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid" }}
      className="flex justify-between items-center p-2 my-2"
    >
      <div>
        <div>User: {comment.username}</div>
        <div>Timestamp: {comment.timestamp}</div>
        <div>Message: {comment.message}</div>
        <div>Vote score: {comment.vote_score}</div>
        {user && (
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <button
                className="hover:cursor-pointer"
                onClick={() => vote(1, comment.uid, comment.cid)}
              >
                <ThumbUpIcon />
              </button>
              <div>{comment.upvotes}</div>
            </div>
            <button
              className="hover:cursor-pointer"
              onClick={() => vote(0, comment.uid, comment.cid)}
            >
              <ThumbDownIcon />
            </button>
            <div>{comment.downvotes}</div>
          </div>
        )}
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
  ));

  return (
    <div className={styles.documentPage}>
      <div className="flex">
        <div className="w-2/3 pr-4">
          <div>EID: {executive_order_id}</div>
          <div>Title: {document.title}</div>
          <div>Signing Date: {document.signing_date}</div>
          <div>
            PDF: <a href={document.pdf_url}>{document.pdf_url}</a>
          </div>
          <div>Signed By: {document.president}</div>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              width="100%"
              height="1000px"
              style={{ border: "none" }}
              title="Document PDF"
            />
          )}
        </div>
        <div className="w-1/3 pl-4">
          <b>Comments</b>
          <CommentInput executiveOrderId={executive_order_id} />
          {Comments}
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
