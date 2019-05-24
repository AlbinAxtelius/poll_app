import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Create() {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [question, setQuestion] = useState("");
  const [redirectId, setRedirectId] = useState(null);

  const addOption = () => {
    const updateOption = newOption.trim();
    if (updateOption === "" || options.length >= 4) return 0;

    setOptions([...options, { title: updateOption }]);
    setNewOption("");
  };

  const removeOption = (index, e) => {
    e.preventDefault();
    const newOptions = [...options];
    newOptions.splice(index, 1);

    setOptions(newOptions);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    fetch("http://localhost:3001/poll/create", {
      method: "POST",
      body: JSON.stringify({
        question,
        alternatives: options
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.pollId !== "") setRedirectId(res.pollId);
      });
  };

  return (
    <>
      <p>Create poll</p>
      <form onSubmit={e => handleSubmit(e)}>
        <p>Question</p>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <p>Options</p>
        <ul>
          {options.map((option, i) => (
            <li key={i}>
              {option.title}
              <a href="/#" onClick={e => removeOption(i, e)}>
                X
              </a>
            </li>
          ))}
        </ul>
        <input type="submit" value="Create poll" />
      </form>
      <form
        onSubmit={e => {
          e.preventDefault();
          addOption();
        }}
      >
        {options.length >= 4 || (
          <>
            <input
              type="text"
              value={newOption}
              onChange={e => setNewOption(e.target.value)}
            />
            <input type="submit" value="Add option" />
          </>
        )}
        {redirectId && <Redirect to={`/Poll/${redirectId}`} />}
      </form>
    </>
  );
}
