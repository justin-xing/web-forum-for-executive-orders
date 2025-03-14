import styles from "./DocumentPage.module.css";
import { useParams } from "react-router-dom";

const DocumentPage = () => {
  const { executive_order_id } = useParams();

  // REPLACE: do api call using executive_order_id, render data
  // (bcuz what if user navigates to post directly, we cant use data from prev filter query (there is no prev query))

  const { title, signing_date, president } = {
    title: "bill 1",
    signing_date: "YYYY-MM-DD",
    president: "uncle sam",
  };

  // REPLACE: get comments with api call using executive_order_id, render comments

  const COMMENTS = [
    {
      username: "swagmaster",
      message: "hihihihihihi",
      timestamp: "insert timestamp",
    },
    {
      username: "swagmaster",
      message: "hihihihihihi",
      timestamp: "insert timestamp",
    },
  ];

  const Comments = COMMENTS.map((comment, i) => {
    return (
      <div key={i}>
        <div>{comment.username}</div>
        <div>{comment.timestamp}</div>
        <div>{comment.message}</div>
      </div>
    );
  });

  return (
    <div className={styles.documentPage}>
      <div>{executive_order_id}</div>
      <div>{title}</div>
      <div>{signing_date}</div>
      <div>{president}</div>
      {Comments}
    </div>
  );
};

export default DocumentPage;
