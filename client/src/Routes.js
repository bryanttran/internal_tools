import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import resetAdminPassword from "./components/resetAdminPassword";
import updateEmail from "./components/updateEmail";

export default () =>
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" exact component={Home} />
    <Route path="/resetAdminPassword" exact component={resetAdminPassword} />
    <Route path="/updateEmail" exact component={updateEmail} />
    <Route component={NotFound} />
  </Switch>;

