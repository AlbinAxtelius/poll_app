import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

export default function Poll(props) {
  const socket = io("http://localhost:3001", {
    query: { pollId: props.match.params.roomId }
  });

  const [roomId, setRoomId] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [pollState, setPollState] = useState({
    question: "",
    alternatives: []
  });

  socket.on("getVote", vote => {
    console.log(vote.alternativeId);
    addVote(vote.alternativeId);
  });
  useEffect(() => {
    if (roomId === "") {
      setRoomId(props.match.params.roomId);
      (async () => {
        await fetch(`http://localhost:3001/poll/${props.match.params.roomId}`)
          .then(res => res.json())
          .then(state => setPollState(state));
      })();
    }
  }, [props.match.params.roomId, roomId]);

  const addVote = i => {
    const newVotes = [...pollState.alternatives];
    newVotes[i].votes++;
    let totalVotes = 0;
    newVotes.map(vote => (totalVotes += vote.votes));
    newVotes.map(vote => (vote.height = 55 * (vote.votes / totalVotes)));
    const newPollState = { ...pollState, alternatives: [...newVotes] };
    setPollState(newPollState);
  };

  const sendVote = i => {
    socket.emit("sendVote", { pollId: roomId, alternativeId: i });
    setHasVoted(true);
  };

  return (
    <>
      <header>
        <Link to={"/"}>
          <i className="material-icons md-36">arrow_back</i>
        </Link>
        <h1>{pollState.question}</h1>
      </header>
      <button onClick={() => console.log(socket)}>Hejsan</button>
      <div className="pollResult">
        {pollState.alternatives.map((data, i) => (
          <div
            className="pollButton"
            style={{ borderTopWidth: hasVoted ? data.height + "vh" : "" }}
            onClick={() => sendVote(i)}
            key={i}
          >
            {data.title} | {data.votes}
          </div>
        ))}
      </div>
    </>
  );
}
