import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./globalReducer";

const composeMiddleware = applyMiddleware(thunk);

export const store = createStore(
  rootReducer,
  composeWithDevTools(composeMiddleware)
);
