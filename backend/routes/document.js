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
  Clinton: "William Clinton",
  Obama: "Barack Obama",
  Bush: "George Bush",
};

router.get("/president/:president", (req, res) => {
  const president = presidentShorthandToDB[req.params.president];

  const tag = req.query.tag;

  let query = getDocumentsQuery;

  let params = [president];

  if (tag) {
    // modify query to add filter
    query = getDocumentsQuery.slice(0, -1);
    query += ` AND tag = ?;`;
    params.push(tag);
  }

  console.log("HIHU: ", params);

  con.query(query, params, function (err, results) {
    if (err) {
      res.status(400).send({
        message: "Could not retrieve documents",
      });
    }
    console.log(results);
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
