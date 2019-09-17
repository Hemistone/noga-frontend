import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Console from "../Routes/Console";

export default () => (
  <Router>
    <Route exact path="/" component={Console} />
  </Router>
);
