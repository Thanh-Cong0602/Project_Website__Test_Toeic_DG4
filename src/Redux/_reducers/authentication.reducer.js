import { userConstants } from '../_constants';
const initialState = {
  isLoggedIn: false,
  dataUser: {},
};

export function authentication(state = initialState, action) {

  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        dataUser: action.payload
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    default:
      return state
  }
}