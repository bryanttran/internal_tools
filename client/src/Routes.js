//root.js

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import resetAdminPassword from "./components/resetAdminPassword";
import resetAdminPasswordConfirm from "./components/resetAdminPasswordConfirm";
import resetAdminPasswordComplete from "./components/resetAdminPasswordComplete";
import unapproveEmail from "./components/unapproveEmail";
import unapproveEmailConfirm from "./components/unapproveEmailConfirm";
import unapproveEmailComplete from "./components/unapproveEmailComplete";

//redux imports
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import store from "./redux/store";
import internalTools from './redux/reducers'

//const store = createStore(internalTools);

export default () =>
  <Provider store={store} >
    <BrowserRouter>
      <Switch> {console.log(store.getState())}
        <Route exact path="/" component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/unapproveEmail" exact component={unapproveEmail} />
        <Route path="/unapproveEmailConfirm" exact component={unapproveEmailConfirm} />
        <Route path="/unapproveEmailComplete" exact component={unapproveEmailComplete} />
        <Route path="/resetAdminPassword" exact component={resetAdminPassword} />
        <Route path="/resetAdminPasswordConfirm" exact component={resetAdminPasswordConfirm} />
        <Route path="/resetAdminPasswordComplete" exact component={resetAdminPasswordComplete} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
