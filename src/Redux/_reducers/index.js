import { combineReducers } from "@reduxjs/toolkit";
import { authentication } from './authentication.reducer';
const rootReducer = combineReducers({
   authentication
})

export default rootReducer