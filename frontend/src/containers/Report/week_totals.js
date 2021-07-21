import * as React from 'react';
import { Fragment } from 'react';
import { Alert } from 'react-bootstrap';
import BarChart from './chart';

const WeekTotals = (props) => {
  return (
    <Fragment>
      <br></br>
      <div className='card'>
        <BarChart
          data={props.data}
          valueField={'total'}
          argumentField={'week'}
          title={'Weekly Total'}
        />
      </div>
      <br></br>
      {props.data.map((week, index) => {
        //mapping through all weeks from 1st of current month to current date and displaying total using bootstrap alert
        return (
          <Alert key={index} variant='success'>
            Total for <b>{week.week}</b> is: ₹{week.total}
          </Alert>
        );
      })}
    </Fragment>
  );
};

export default WeekTotals;
