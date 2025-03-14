import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";
const router = Router();

const getDocumentsQuery = fs
  .readFileSync("../queries/getDocuments.sql")
  .toString();

const presidentShorthandToDB = {
  Trump: "Donald Trump",
  Biden: "Joe Biden",
  Clinton: "Hillary Clinton",
  Obama: "Barack Obama",
};

router.get("/president/:president", (req, res) => {
  const president = presidentShorthandToDB[req.params.president];

  con.query(getDocumentsQuery, [president], function (err, results) {
    if (err) {
      res.status(400).send({
        message: "Could not retrieve documents",
      });
    }
    res.status(200).send({
      documents: results,
    });
  });
});

export const documentRoute = router;
