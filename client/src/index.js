import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

//redux imports
import { createStore } from 'redux'
import { Provider } from 'react-redux';
//import store from "./redux/store";
import internalTools from './redux/reducers'

const store = createStore(internalTools);

ReactDOM.render(
  <Provider store={store} >
    <Router>
        <App />
    </Router>
  </Provider>,
document.getElementById('root')
);
