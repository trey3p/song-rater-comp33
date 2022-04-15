import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { loginReducer } from "./components/login/LoginReducer";
import { notesReducer } from "./components/notes/NotesReducer";
import { signupReducer } from "./components/signup/SignupReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
  });

export default createRootReducer;
