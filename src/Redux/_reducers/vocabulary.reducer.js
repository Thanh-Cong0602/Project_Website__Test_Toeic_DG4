import { vocabularyConstants } from "../_constants";

const initialState = {
  currentCategory: {},
  saveResultPlayGame: []
}

export function vocabulary(state = initialState, action) {
  switch (action.type) {
    case vocabularyConstants.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      }
    case vocabularyConstants.SAVE_RESULT_PLAYGAME:
      const existingTopicIndex = state.saveResultPlayGame.findIndex(
        (topic) => topic.categoryID === action.payload.categoryID
      );
      let updatedSaveResultPlayGame = [];
      if (existingTopicIndex !== -1) {
        updatedSaveResultPlayGame = [...state.saveResultPlayGame];
        updatedSaveResultPlayGame[existingTopicIndex] = action.payload;
      } else {
        updatedSaveResultPlayGame = [...state.saveResultPlayGame, action.payload];
      }

      return {
        ...state,
        saveResultPlayGame: updatedSaveResultPlayGame,
      };
    default:
      return state
  }
}