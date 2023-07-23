import { combineReducers } from "@reduxjs/toolkit";
import { authentication } from './authentication.reducer';
import { vocabulary } from "./vocabulary.reducer";
const rootReducer = combineReducers({
   authentication,
   vocabulary
})

export default rootReducer