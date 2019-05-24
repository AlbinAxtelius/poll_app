const mongoose = require("mongoose");

const pollsSchema = mongoose.Schema({
  // _id: String,
  question: String,
  alternatives: Array
})

const polls = mongoose.model("polls", pollsSchema);

module.exports = polls;