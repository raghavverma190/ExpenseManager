import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Alert } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { Fragment } from 'react';
import { getExpenses } from '../../actions/expense.actions';

/**
 * @author
 * @function Dashboard
 **/

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses).slice(0, 5);
  const total = useSelector((state) => state.expenses.total);

  //Expenses are retreieved as soon as page is loaded
  useEffect(() => {
    dispatch(getExpenses());
  }, []);

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
          Your Recent Transactions
        </h3>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Description</th>
              <th>Category</th>
              <th>DateTime</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => {
              //Since dateTime stored in DB is GST time, IST time and format is calculated
              var IST_DATE = new Date(expense.createdAt).toLocaleString(
                'en-GB',
                { timeZone: 'Asia/Kolkata' }
              );

              //Currency symbol added to amount on dashboard
              var currency;
              if (expense.currency === 'rupee') {
                currency = '₹';
              } else if (expense.currency === 'euro') {
                currency = '€';
              } else if (expense.currency === 'dollar') {
                currency = '$';
              } else if (expense.currency === 'pound') {
                currency = '£';
              }

              return (
                <tr key={expense._id}>
                  <td>{index + 1}</td>
                  <td>{currency + expense.amount}</td>
                  <td>{expense.currency}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{IST_DATE}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Alert variant='primary'>
          Total amount spent yet: <b>₹{total}</b>
        </Alert>
      </Fragment>
    </Layout>
  );
};

export default Dashboard;
