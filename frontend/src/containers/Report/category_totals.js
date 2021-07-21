import * as React from 'react';
import { Fragment } from 'react';
import { Alert } from 'react-bootstrap';
import BarChart from './chart';

const CategoryTotals = (props) => {
  return (
    <Fragment>
      <br></br>
      <div className='card'>
        <BarChart
          data={props.data}
          valueField={'Total'}
          argumentField='Category'
          title={'Monthly Category Total'}
        />
      </div>
      <br />
      {props.data.map((category, index) => {
        //mapping through all categories and displaying total using bootstrap alert
        return (
          <Alert key={index} variant='success'>
            Total for category <b>{category.Category}</b> is: ₹{category.Total}
          </Alert>
        );
      })}
    </Fragment>
  );
};

export default CategoryTotals;
