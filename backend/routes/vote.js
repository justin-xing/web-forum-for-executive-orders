import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";

const router = Router();

const getVoteQuery = fs.readFileSync("queries/getVote.sql").toString();
const createVoteQuery = fs.readFileSync("queries/createVote.sql").toString();
const updateVoteQuery = fs.readFileSync("queries/updateVote.sql").toString();

router.post("/votes", (req, res) => {
  const { vote, uid, cid } = req.body;

  con.query(getVoteQuery, [uid, cid], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ message: "Could not retrieve vote" });
    }

    if (results.length > 0) {
      con.query(updateVoteQuery, [vote, uid, cid], (err) => {
        if (err) {
          console.error(err);
          return res.status(400).send({ message: "Could not update vote" });
        }
        return res.status(200).send({ message: "Vote successfully updated" });
      });
    } else {
      con.query(createVoteQuery, [vote, uid, cid], (err) => {
        if (err) {
          console.error(err);
          return res.status(400).send({ message: "Could not create vote" });
        }
        return res.status(201).send({ message: "Vote successfully created" });
      });
    }
  });
});

export const voteRoute = router;
