const express = require("express");
const app = express();
const socket = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const url = "mongodb://headPoll:_headPoll@78.73.225.185:27017/Poll";

const poll = require("./routes/poll");

mongoose.connect(url, { useNewUrlParser: true }, err => console.log(err));

const server = app.listen(3001, () => {
  console.log("Listening to port 3001");
});
const io = socket(server);

io.on("connection", socket => {
  console.log(socket.id)
  socket.join(socket.handshake.query.pollId);
  socket.on("sendVote", vote => {
    console.log(vote);
    io.to(vote.pollId).emit("getVote", { alternativeId: vote.alternativeId });
  });
  socket.on("disconnect",() => {
    socket.leaveAll();
  })
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/poll", poll);
