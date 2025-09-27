const express = require("express");
const {
  createBook,
  listAllBooks,
  patchBook,
  removeBook
} = require("../controllers/adminController.js");

const router = express.Router();

// POST 
router.post("/", createBook);

// GET
router.get("/", listAllBooks);

// PATCH
router.patch("/:id", patchBook);

// DELETE 
router.delete("/:id", removeBook);

module.exports = router;
