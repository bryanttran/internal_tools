import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

export default () =>
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" exact component={Home} />
    <Route component={NotFound} />
  </Switch>;

