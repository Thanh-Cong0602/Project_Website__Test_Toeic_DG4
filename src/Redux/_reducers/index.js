import { combineReducers } from "@reduxjs/toolkit";
import { authentication } from './authentication.reducer';
import { vocabulary } from "./vocabulary.reducer";
import { practice } from "./practice.reducer";
const rootReducer = combineReducers({
   authentication,
   vocabulary,
   practice
})

export default rootReducer