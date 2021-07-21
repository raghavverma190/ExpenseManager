import axios from '../helpers/axios';
import { userConstants } from './constants';

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    //sending post request through axios to server
    const res = await axios.post(`/signup`, {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      });
      alert('User successfully registered');
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
    dispatch({ type: userConstants.CLEAR_REGISTER_STATE });
  };
};
