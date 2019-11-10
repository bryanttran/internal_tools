import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import resetAdminPassword from "./components/resetAdminPassword";
import unapproveEmail from "./components/unapproveEmail";
import unapproveEmailConfirm from "./components/unapproveEmailConfirm";

export default () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/resetAdminPassword" exact component={resetAdminPassword} />
      <Route path="/unapproveEmail" exact component={unapproveEmail} />
      <Route path="/unapproveEmailConfirm" exact component={unapproveEmailConfirm} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  

