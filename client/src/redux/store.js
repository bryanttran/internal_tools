import { createStore } from "redux";
import rootReducer from "./reducers"
import {loadState, saveState} from "./localStorage"
import throttle from 'lodash.throttle';

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
    saveState({
      permissions: store.getState().permissions
    });
    console.log(store.getState().permissions)
  }
);

export default store