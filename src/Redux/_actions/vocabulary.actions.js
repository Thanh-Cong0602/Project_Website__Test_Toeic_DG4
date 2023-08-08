import { vocabularyConstants } from "../_constants";

export const vocabularyActions = {
   setCurrentCategory,
   saveResultPlayGame
}

function setCurrentCategory(category) {
   return {
      type: vocabularyConstants.SET_CURRENT_CATEGORY,
      payload: category
   }
}

function saveResultPlayGame(result) {
   return {
      type: vocabularyConstants.SAVE_RESULT_PLAYGAME,
      payload: result
   }
}