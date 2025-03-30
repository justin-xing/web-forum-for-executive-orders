import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";
const router = Router();

const getCommentsQuery = fs.readFileSync("queries/getComments.sql").toString();
const deleteCommentQuery = fs
  .readFileSync("queries/deleteComment.sql")
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

router.delete("/delete/:id", (req, res) => {
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

export const commentRoute = router;
