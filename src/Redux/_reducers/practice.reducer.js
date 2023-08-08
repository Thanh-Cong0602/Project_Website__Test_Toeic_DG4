import { practiceConstants } from "../_constants";

const initialState = {
  saveAnswerFromUser: [],
  saveResultListeningByTest: Array(10).fill({ new: 6, correct: 0, incorrect: 0 })
}

export function practice(state = initialState, action) {
  switch (action.type) {
    case practiceConstants.SAVE_ANSWER_FROM_USER:
      return {
        ...state,
        saveAnswerFromUser: action.payload
      }
    case practiceConstants.SAVE_RESULT_LISTENING_BY_TEST:
      const { indexTest, result } = action.payload;
      const updatedListeningByTest = [...state.saveResultListeningByTest];
      updatedListeningByTest[indexTest] = result
      return {
        ...state,
        saveResultListeningByTest: updatedListeningByTest
      }
    default:
      return state
  }
}