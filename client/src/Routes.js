import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import resetAdminPassword from "./components/resetAdminPassword";
import unapproveEmail from "./components/unapproveEmail";

export default () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/resetAdminPassword" exact component={resetAdminPassword} />
      <Route path="/unapproveEmail" exact component={unapproveEmail} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  

