import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { Fragment } from 'react';
import { getExpenses } from '../../actions/expense.actions';
import ExpensesTable from './table';
/**
 * @author
 * @function Expenses
 **/

const Expenses = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  useEffect(() => {
    dispatch(getExpenses());
  }, []);

  expenses.forEach((expense, index) => {
    //setting IST dateTime and amount with currency in expenses
    expenses[index].index = index + 1; //setting up sr.no for data
    var IST_DATE = new Date(expense.createdAt).toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
    });
    expenses[index].IST_DATE = IST_DATE;
  });

  return (
    <Layout sidebar>
      <Fragment>
        <br></br>
        <h3
          style={{
            textAlign: 'center',
            paddingBottom: '0.5em',
          }}
        >
          Your Expenses
        </h3>
        <ExpensesTable expenses={expenses} />
      </Fragment>
      <p></p>
      <Alert variant={'warning'}>
        You can edit a cell simply by clicking on it. Save your updated value by
        pressing on enter.
      </Alert>
      <Alert variant={'danger'}>
        You can delete an expense by selecting and clicking on delete.
      </Alert>
    </Layout>
  );
};

export default Expenses;
