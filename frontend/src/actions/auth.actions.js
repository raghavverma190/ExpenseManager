import axios from '../helpers/axios';
import {
  authConstants,
  expenseConstants,
  totalConstants,
  userConstants,
} from './constants';

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    //sending post request through axios to server
    const res = await axios.post(`/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: res.data,
        },
      });
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
  };
};

//checks whether user still logged in or not by checking token stored in localStorage
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: 'Failed to login',
        },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    //sending post request through axios to server
    const res = await axios.post('/signout');
    if (res.status === 200) {
      localStorage.clear();
      //Multiple LOGOUT_SUCCESS constants to clear out all states when user signs out
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
      dispatch({
        type: expenseConstants.LOGOUT_SUCCESS,
      });
      dispatch({
        type: totalConstants.LOGOUT_SUCCESS,
      });
      dispatch({
        type: userConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
