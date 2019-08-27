import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Landing from "../Routes/Landing";
import Console from "../Routes/Console";

export default () => (
  <Router>
    <Route exact path="/" component={Landing} />
    <Route exact path="/console" component={Console} />
  </Router>
);
