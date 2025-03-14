import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";
const router = Router();

const getDocumentsQuery = fs
  .readFileSync("queries/getDocuments.sql")
  .toString();

const getDocumentDetailsQuery = fs
  .readFileSync("queries/getDocumentDetails.sql")
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

router.get("/:eid", (req, res) => {
  const eid = req.params.eid;
  con.query(getDocumentDetailsQuery, [eid], function (err, results) {
    if (err) {
      res.status(400).send({
        message: "Could not retrieve documents",
      });
    }
    res.status(200).send({
      document: results[0],
    });
  });
});

export const documentRoute = router;
