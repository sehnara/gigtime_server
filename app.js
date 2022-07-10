import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetsRouter from "./router/test.js";
import mysql from "mysql";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   port: 3306,
//   database: "gig_time",
// });

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  port: 3306,
  database: "gig_time",
});

// connection.connect();

// connection.query("SELECT * from owners", (error, rows, fields) => {
//   console.log("User info is: ", rows);
// });

// connection.end();

pool.getConnection(function (err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  connection.query("SELECT * FROM owners", function (error, results, fields) {
    // When done with the connection, release it.
    console.log(results);
    connection.release();

    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
});

app.listen(8080);
