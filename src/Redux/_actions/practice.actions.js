import { practiceConstants } from "../_constants";

export const practiceActions = {
  saveAnswerFromUser,
  saveResultListeningByTest
}

function saveAnswerFromUser(result) {
  return {
    type: practiceConstants.SAVE_ANSWER_FROM_USER,
    payload: result
  }
}

function saveResultListeningByTest(indexTest, result) {
  return {
    type: practiceConstants.SAVE_RESULT_LISTENING_BY_TEST,
    payload: {
      indexTest,
      result
    }
  }
}