import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";
const router = Router();

const getCommentsQuery = fs.readFileSync("queries/getComments.sql").toString();
const insertCommentQuery = fs
  .readFileSync("queries/insertComment.sql")
  .toString();
const deleteCommentQuery = fs
  .readFileSync("queries/deleteComment.sql")
  .toString();
const getControversialCommentsQuery = fs
  .readFileSync("queries/getControversialComments.sql")
  .toString();

router.get("/comments/:executiveOrderId", (req, res) => {
  const executiveOrderId = req.params.executiveOrderId;
  con.query(getCommentsQuery, [executiveOrderId], function (err, results) {
    if (err) {
      console.log(err);
      res.status(400).send({
        message: "Could not retrieve comments",
      });
    }
    res.status(200).send({
      comments: results,
    });
  });
});

router.post("/comments/:executiveOrderId", async (req, res) => {
  const uid = req.body.uid;
  const message = req.body.message;
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const executiveOrderId = req.params.executiveOrderId;

  try {
      con.promise().beginTransaction(); // Start transaction

      // Insert comment
      const[commentResult] = await con.promise().query(
          "INSERT INTO Comment(uid, executive_order_id, message, timestamp) VALUES (?, ?, ?, ?)",
          [uid, executiveOrderId, message, timestamp]
      );

      const commentId = commentResult.insertId;

      // Insert vote
      con.promise().query(
          "INSERT INTO VoteFor(uid, cid, is_upvote) VALUES (?, ?, ?)",
          [uid, commentId, 1]
      );

      con.promise().commit(); // Commit transaction

      res.status(200).send({
          message: "Comment successfully inserted",
      });
  } catch (error) {
      con.promise().rollback(); // Rollback on error
      console.error("Error inserting comment:", error);
      res.status(400).send({
          message: "Could not insert comment",
          error: error.message,
      });
  }
});

router.delete("/comments/:id", (req, res) => {
  const commentId = req.params.id;
  con.query(deleteCommentQuery, [commentId], function (err, results) {
    if (err) {
      console.log(err);
      res.status(400).send({
        message: "Could not delete comment",
      });
    }
    res.status(200).send({
      message: "Comment successfully deleted",
    });
  });
});

router.get("/controversial-comments", (req, res) => {
  con.query(getControversialCommentsQuery, function (err, results) {
    if (err) {
      console.log(err);
      res.status(400).send({
        message: "Could not retrieve controversial comments",
      });
    }
    res.status(200).send({
      comments: results,
    });
  });
});
export const commentRoute = router;
