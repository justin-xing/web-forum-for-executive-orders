import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";
const router = Router();

const getUsersQuery = fs.readFileSync("queries/getUsers.sql").toString();
const deleteUserQuery = fs.readFileSync("queries/deleteUser.sql").toString();

router.get("/users", (req, res) => {
  con.query(getUsersQuery, function (err, results) {
    if (err) {
      res.status(400).send({
        message: "Could not retrieve users",
      });
    }
    res.status(200).send({
      users: results,
    });
  });
});

router.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;
  con.query(deleteUserQuery, [userId], function (err, results) {
    if (err) {
      res.status(400).send({
        message: "Could not delete user",
      });
    }
    res.status(200).send({
      message: "User successfully deleted",
    });
  });
});

export const userRoute = router;
