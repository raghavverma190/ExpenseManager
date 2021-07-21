import { userConstants } from '../actions/constants';

const initState = {
  error: null,
  message: '',
  loading: false,
};

export default (state = initState, action) => {
  // console.log(action);
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        error: null,
        message: '',
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: 'Registration successfull',
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.CLEAR_REGISTER_STATE:
      state = {
        ...initState,
      };
      break;
    case userConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
  }

  return state;
};
