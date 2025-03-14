import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";
const router = Router();

const getCommentsQuery = fs.readFileSync("queries/getComments.sql").toString();

router.get("/comments/:executiveOrderId", (req, res) => {
  const executiveOrderId = req.params.executiveOrderId;
  con.query(getCommentsQuery, [executiveOrderId], function (err, results) {
    if (err) {
      console.log(err);
      res.status(400).send({
        message: "Could not retrieve comments",
      });
    }
    console.log(results);
    res.status(200).send({
      comments: results,
    });
  });
});

export const commentRoute = router;
