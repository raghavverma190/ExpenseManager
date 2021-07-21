import { expenseConstants } from '../actions/constants';

const initState = {
  expenses: [],
  total: 0,
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case expenseConstants.GET_EXPENSES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case expenseConstants.GET_EXPENSES_SUCCESS:
      state = {
        ...state,
        expenses: action.payload.expenses,
        total: action.payload.total,
        loading: false,
      };
      break;
    case expenseConstants.GET_EXPENSES_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case expenseConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
  }

  return state;
};
