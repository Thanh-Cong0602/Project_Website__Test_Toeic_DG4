import { userConstants } from '../_constants';
import Cookies from 'js-cookie';
export const userActions = {
  login,
  logout
}

function login(dataUser) {
  Cookies.set('role', dataUser.role)
  return (dispatch) => {
    dispatch(success(dataUser))
  }
  function success(dataUser) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      payload: dataUser
    }
  }
}

function logout() {
  Cookies.remove('role')
  return { type: userConstants.LOGOUT };
}