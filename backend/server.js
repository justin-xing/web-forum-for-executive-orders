import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import { userRoute } from "./routes/user.js";
import cors from "cors";
import { commentRoute } from "./routes/comment.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

export const con = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "testDB",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use("/api/user", userRoute);
app.use("/api/comment", commentRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
