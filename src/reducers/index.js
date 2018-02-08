import { combineReducers } from "redux";
import user from "./user";
import token from "./token";
import songs from "./song";

export default combineReducers({
  user,
  token,
  songs
});
