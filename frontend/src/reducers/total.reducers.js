import { totalConstants } from '../actions/constants';

const initState = {
  week_totals: [],
  error: null,
  loading: false,
  category_totals: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case totalConstants.GET_TOTAL_WEEK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case totalConstants.GET_TOTAL_WEEK_SUCCESS:
      state = {
        ...state,
        week_totals: action.payload.week_totals,
        error: null,
        loading: false,
      };
      break;
    case totalConstants.GET_TOTAL_WEEK_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case totalConstants.GET_TOTAL_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case totalConstants.GET_TOTAL_CATEGORY_SUCCESS:
      state = {
        ...state,
        category_totals: action.payload.category_totals,
        error: null,
        loading: false,
      };
      break;
    case totalConstants.GET_TOTAL_WEEK_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case totalConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
  }

  return state;
};
