import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import Expenses from './containers/Expenses';
import Report from './containers/Report';

//importing css dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { getExpenses } from './actions/expense.actions';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      //retreiving expenses to be shown on dashboard as soon as web-app is loaded
      dispatch(getExpenses());
    }
  }, [auth.authenticate]); //when authenticate state will change, this useEffect will be called

  return (
    <div className='App'>
      <Switch>
        {/* Private routes are those routes that can only be accessed if client is logged in */}
        <PrivateRoute path='/' exact component={Dashboard} />
        <PrivateRoute path='/expenses' exact component={Expenses} />
        <PrivateRoute path='/report' exact component={Report} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
