const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // token auto-deletes after 24 hours
  }
});

const BlackListTokenModel = mongoose.model("blacklistedtoken", blacklistSchema);

module.exports = BlackListTokenModel;
