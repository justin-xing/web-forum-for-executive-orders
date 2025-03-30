import { Router } from "express";
import { con } from "../server.js";
import fs from "fs";
import bcrypt from "bcrypt";

const router = Router();

const getLoginQuery = fs.readFileSync("queries/getLogin.sql").toString();
const createUserQuery = fs.readFileSync("queries/createUser.sql").toString();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  con.query(getLoginQuery, [email], async (err, results) => {
    if (err) {
      return res.status(400).send({ error: "Could not retrieve user" });
    }
    if (results.length === 0) {
      return res.status(404).send({ error: "User not found" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).send({ error: "Invalid password" });
    }

    delete user.password_hash;

    res.status(200).send({ user });
  });
});

router.post("/signup", async (req, res) => {
  const {
    name,
    username,
    location,
    role,
    password,
    email,
    gender,
    dateOfBirth,
  } = req.body;

  console.log(req.body, "ASDSADS");
  const hashedPassword = await bcrypt.hash(password, 10);

  con.query(
    createUserQuery,
    [
      name,
      username,
      location,
      role,
      hashedPassword,
      email,
      gender,
      dateOfBirth,
    ],
    (err, results) => {
      if (err) {
        return res.status(400).send({ error: "Could not create user" });
      }
      res.status(201).send({ message: "User created successfully" });
    }
  );
});

export const authRoute = router;
