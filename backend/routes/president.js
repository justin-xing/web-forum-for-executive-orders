import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";
const router = Router();

const getPresidentsQuery = fs
  .readFileSync("queries/getPresidents.sql")
  .toString();

const getPresidentRelevanceScoreQuery = fs
  .readFileSync("queries/getPresidentRelevanceScore.sql")
  .toString();

router.get("/", (req, res) => {
  con.query(getPresidentsQuery, function (err, results) {
    if (err) {
      res.status(400).send({
        message: "Could not retrieve presidents",
      });
    }
    res.status(200).send({
      presidents: results.map((item) => item.president.split(" ")[1]),
    });
  });
});

router.get("/relevance-score", (req, res) => {
  con.query(getPresidentRelevanceScoreQuery, function (err, results) {
    if (err) {
      console.log(err);
      res.status(400).send({
        message: "Could not retrieve president relevance score",
      });
    }
    res.status(200).send({ presidents: results });
  });
});

export const presidentRoute = router;
