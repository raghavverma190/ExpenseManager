import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import authReducer from './auth.reducers';
import expensesReducers from './expenses.reducers';
import totalReducers from './total.reducers';

//setting up various states that will be used in the web-app
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  expenses: expensesReducers,
  total: totalReducers,
});

export default rootReducer;
