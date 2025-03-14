import { Router } from 'express';
import { con } from '../server.js';
import fs from 'fs';
const router = Router();

const getPresidentsQuery = fs
  .readFileSync('queries/getPresidents.sql')
  .toString();

router.get('/', (req, res) => {
  con.query(getPresidentsQuery, function (err, results) {
    if (err) {
      res.status(400).send({
        message: 'Could not retrieve presidents',
      });
    }
    res.status(200).send({
      presidents: results.map((item) => item.president.split(' ')[1]),
    });
  });
});

export const presidentRoute = router;
