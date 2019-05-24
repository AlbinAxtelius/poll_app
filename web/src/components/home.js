import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home({ history }) {
  const [poll, setPoll] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    history.push(`/Poll/${poll}`);
  };

  return (
    <div>
      <h1>Join poll</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          value={poll}
          onChange={e => setPoll(e.target.value)}
        />
      </form>
      <h1>
        or{" "}
        <Link to="/Create">create poll</Link>
      </h1>
    </div>
  );
}

export default Home;
