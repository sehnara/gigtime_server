import "express-async-errors";
import express from "express";
// import db from "../db.js";

const router = express.Router();

// GET/TEST
router.get("/", (req, res, next) => {
  db.getOwner((rows) => {
    res.render("index", { rows });
  });
});

// POST/TEST

export default router;
