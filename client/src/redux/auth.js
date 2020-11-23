import axios from 'axios';
import jwt_decode from 'jwt-decode';

import history from '../util/history';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const registerUser = (user) => dispatch => {
  if (user.password !== user.confirmPassword) {
    dispatch(addError("Passwords must match"));
    return;
  }

  delete user.confirmPassword;

  axios.post('/users/register', user)
    .then(() => {
      dispatch(loginUser({ email: user.email, password: user.password }));
    })
    .catch((err) => dispatch(addError(err.response.data.msg)));
}

export const loginUser = (user) => dispatch => {
  axios.post('/users/login', user)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const { token } = res.data;

        const decoded = jwt_decode(token);
        decoded.token = token;
        dispatch(setCurrentUser(decoded));
        history.push('/meditate');
      } else {
        dispatch(addError(res.data.msg));
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch(addError(error.response.data.msg));
      }
    })
}

export const logoutUser = () => dispatch => {
  dispatch(logoutCurrentUser());
}

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  }
}

export const addError = (message) => {
  return {
    type: ADD_ERROR,
    payload: { message }
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  }
}

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    case LOGOUT_CURRENT_USER:
      return initialState;
    case ADD_ERROR:
      return { errorMessage: action.payload.message }
    case CLEAR_ERROR:
      return initialState;
    default:
      return state;
  }
}