

const express = require('express');
const { addMember, getMemberBorrowedBooks } = require('../controllers/member.controller');

const memeberRouter = express.Router();

memeberRouter.post("/add-member", addMember)
memeberRouter.get("/borrowed-books/:memberId", getMemberBorrowedBooks)

module.exports = memeberRouter