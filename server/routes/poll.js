const express = require("express");
const router = express.Router();
const polls = require("../models/polls");
const mongoose = require("mongoose");

router.get("/:id", (req, res, next) => {
  polls
    .findById(req.params.id)
    .then(poll => {
      res.send(poll);
    })
    .catch(err => console.log(err));
});

router.post("/create", (req, res) => {
  if (typeof req.body === "undefined")
    return res.json({ ok: false, error: "Fill fields" });
  else {
    const { question, alternatives } = req.body;
    console.log(alternatives, question);
    if (question !== "")
      if (alternatives === undefined)
        return res.json({ ok: false, error: "Fill all fields" });
      else {
        if (alternatives.length != 0) {
          alternatives.forEach(e => (e.votes = 0) );
          //Insert into database
          const newPoll = new polls({ question, alternatives });
          newPoll.save((err, poll) => {
            if (err) return res.json(err);
            return res.json({ ok: true, pollId: poll._id });
          });
        }
      }
    else return res.json({ ok: false, error: "Fill all fields" });
  }
});

module.exports = router;
