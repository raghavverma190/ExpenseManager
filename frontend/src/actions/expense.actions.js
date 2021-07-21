import axios from '../helpers/axios';
import { expenseConstants } from './constants';

export const getExpenses = () => {
  return async (dispatch) => {
    dispatch({ type: expenseConstants.GET_EXPENSES_REQUEST });
    //sending post request through axios to server
    const res = await axios.post(`getExpenses`);
    if (res.status === 200) {
      const { expenses, total } = res.data;
      dispatch({
        type: expenseConstants.GET_EXPENSES_SUCCESS,
        payload: { expenses, total },
      });
    } else {
      const error = res.data.error;
      dispatch({
        type: expenseConstants.GET_EXPENSES_FAILURE,
        payload: { error },
      });
    }
  };
};

export const deleteExpenseById = (payload) => {
  return async (dispatch) => {
    //sending delete request through axios to server
    const res = await axios.delete(`/deleteExpense`, {
      data: { payload },
    });
    dispatch({ type: expenseConstants.DELETE_EXPENSE_BY_ID_REQUEST });
    if (res.status === 202) {
      dispatch({ type: expenseConstants.DELETE_EXPENSE_BY_ID_SUCCESS });
      dispatch(getExpenses());
      alert('Expense deleted successfully');
    } else {
      const { error } = res.data;
      dispatch({
        type: expenseConstants.DELETE_EXPENSE_BY_ID_FAILURE,
        payload: {
          error,
        },
      });
      alert('Sorry,an error occured');
    }
  };
};

export const updateExpense = (payload) => {
  return async (dispatch) => {
    //sending post request through axios to server
    const res = await axios.post(`/updateExpense`, {
      data: { payload },
    });
    dispatch({ type: expenseConstants.UPDATE_EXPENSE_REQUEST });
    if (res.status === 201) {
      dispatch({ type: expenseConstants.UPDATE_EXPENSE_SUCCESS });
      dispatch(getExpenses());
      alert('Expense updated successfully');
    } else {
      const { error } = res.data;
      dispatch({
        type: expenseConstants.UPDATE_EXPENSE_FAILURE,
        payload: {
          error,
        },
      });
      alert('Sorry,an error occured');
    }
  };
};

export const addExpense = (payload) => {
  return async (dispatch) => {
    //sending post request through axios to server
    const res = await axios.post(`/addExpense`, {
      data: { payload },
    });
    dispatch({ type: expenseConstants.ADD_EXPENSE_REQUEST });
    if (res.status === 201) {
      dispatch({ type: expenseConstants.ADD_EXPENSE_SUCCESS });
      dispatch(getExpenses());
      alert('Expense added successfully');
    } else {
      const { error } = res.data;
      dispatch({
        type: expenseConstants.ADD_EXPENSE_FAILURE,
        payload: {
          error,
        },
      });
      alert('Sorry,an error occured');
    }
  };
};
