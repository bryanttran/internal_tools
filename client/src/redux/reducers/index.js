import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import permissions from "./permissions";

export default combineReducers({ permissions, visibilityFilter });
