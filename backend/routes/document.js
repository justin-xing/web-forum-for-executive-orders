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

const searchDocumentsQuery = fs
  .readFileSync("queries/searchDocuments.sql")
  .toString();

const presidentShorthandToDB = {
  Trump: "Donald Trump",
  Biden: "Joe Biden",
  Clinton: "William Clinton",
  Obama: "Barack Obama",
  Bush: "George Bush",
};

router.get("/search", (req, res) => {
  const searchTerm = req.query.term;

  con.query(searchDocumentsQuery, [searchTerm], function (err, results) {
    if (err) {
      res.status(400).send({
        message: "Error searching documents",
      });
    }
    res.status(200).send({
      documents: results,
    });
  });
});

router.post("/pdfproxy", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const data = Buffer.from(arrayBuffer);
    res.set("Access-Control-Allow-Origin", "*");
    res.type("pdf");
    res.status(200).send(data);
  } catch (error) {
    console.error("Error proxying PDF file:", error);
    res.status(400).send({
      message: "Error proxying pdf file",
    });
  }
});

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

  con.query(query, params, function (err, results) {
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
