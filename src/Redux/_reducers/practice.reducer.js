import { practiceConstants } from "../_constants";

const initialState = {
  saveResultPlayGameListening: 0
}

export function practice(state= initialState, action) {
  switch(action.type) {
    case practiceConstants.SAVE_RESULT_PLAYGAME_LISTENING:
      return {
        ... state,
        saveResultPlayGameListening: action.payload
      }
    default: 
    return state
  }
}