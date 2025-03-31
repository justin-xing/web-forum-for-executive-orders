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

  const fetchDocumentDetails = async () => {
    const res = await fetch(`/api/document/${executive_order_id}`);
    const data = await res.json();
    setDocument(data.document);
  };
  const fetchComments = async () => {
    const res = await fetch(`/api/comment/comments/${executive_order_id}`);
    const data = await res.json();
    setComments(data.comments);
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

  const Comments = comments.map((comment, i) => {
    return (
      <div
        key={i}
        className="flex justify-between items-start p-4 mb-4 border rounded shadow-md"
      >
        <div>
          <div className="font-semibold">{comment.username}</div>
          <div className="text-sm text-gray-500">
            {new Date(comment.timestamp).toLocaleString()}
          </div>
          <div className="mt-2">{comment.message}</div>
          <div className="mt-2">Vote score: {comment.vote_score}</div>
          {user && (
            <div className="flex items-center mt-2 gap-4">
              <div className="flex items-center gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => vote(1, comment.uid, comment.cid)}
                >
                  <ThumbUpIcon />
                </button>
                <span>{comment.upvotes}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => vote(0, comment.uid, comment.cid)}
                >
                  <ThumbDownIcon />
                </button>
                <span>{comment.downvotes}</span>
              </div>
            </div>
          )}
        </div>
        {user && user.role === 'admin' && (
          <div className="self-start">
            <button
              className="text-red-600 hover:text-red-800"
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
      <div className="bg-white rounded-md shadow-md p-4 mb-4 border border-gray-300">
        <div className="flex items-center mb-2">
          <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center mr-2">
            EID
          </div>
          <div className="font-semibold text-lg">{executive_order_id}</div>
        </div>
        <div className="mb-2">
          <div className="font-semibold">Title:</div>
          <div>{document.title}</div>
        </div>
        <div className="mb-2">
          <div className="font-semibold">Signing Date:</div>
          <div>{new Date(document.signing_date).toLocaleDateString()}</div>
        </div>
        <div className="mb-2">
          <div className="font-semibold">PDF:</div>
          <a href={document.pdf_url} className="text-blue-600 hover:underline">
            {document.pdf_url}
          </a>
        </div>
        <div>
          <div className="font-semibold">Signed By:</div>
          <div>{document.president}</div>
      </div>
    </div>
      <b>Comments</b>
      <CommentInput executiveOrderId={executive_order_id}/>
      <div className="h-5"></div>
      {Comments}
    </div>
  );
};

export default DocumentPage;
