import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/home";
import Poll from "./components/poll";
import Create from "./components/create";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <>
            <Switch>
              <Route path="/Poll/:roomId" component={Poll} />
              <Route path="/Create" component={Create} />
            </Switch>
          </>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
