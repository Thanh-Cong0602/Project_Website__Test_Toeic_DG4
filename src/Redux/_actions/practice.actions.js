import { practiceConstants } from "../_constants";

export const practiceActions = {
  saveResultPlayGameListening
}

function saveResultPlayGameListening(result) {
  return {
    type: practiceConstants.SAVE_RESULT_PLAYGAME_LISTENING,
    payload: result
  }
}