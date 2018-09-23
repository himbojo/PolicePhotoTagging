import { combineReducers } from "redux";
import auth from "./auth";
import search from "./search";

//example import zomatoCuisinesReducer from './zomatoCuisinesReducer';

export default combineReducers({
  auth,
  search
  //examples
  //zomato: zomatoCuisinesReducer
});
