import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import ConsoleLobby from "../Routes/ConsoleLobby";

const ConsoleLobbyRoutes = () => (
  <>
    <Route exact path="/" component={ConsoleLobby} />
  </>
);

const AppRouter = () => (
  <Router>
    <ConsoleLobbyRoutes />
  </Router>
);

export default AppRouter;
