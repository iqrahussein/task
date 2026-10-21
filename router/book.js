// const express = require("express");
import express from "express";
import {
  createbook,
  getbook,
  updateUser,
  deletedbook,
} from "../controller/book.js";

const router = express.Router();

router.post("/create", createbook);
router.get("/", getbook);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deletedbook);
// router.post("/register", register);

// module.exports = router;

export default router;
