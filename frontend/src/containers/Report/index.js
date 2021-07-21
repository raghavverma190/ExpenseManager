import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { Fragment } from 'react';
import { getTotalCategory, getTotalWeek } from '../../actions';
import WeekTotals from './week_totals';
import CategoryTotals from './category_totals';

/**
 * @author
 * @function Report
 **/

const Report = (props) => {
  const dispatch = useDispatch();

  //assigning week_totals and category_totals to constant variable from redux store
  const week_totals = useSelector((state) => state.total.week_totals);
  const category_totals = useSelector((state) => state.total.category_totals);

  //Key for tabs
  //Default key is week i.e. weekly total chart will be displayed by default
  const [key, setKey] = useState('week');

  //data to be set for sending over to chart
  const [data, setData] = useState([]);

  //retrieving week_totals and category_totals as soon as page is loaded
  useEffect(() => {
    dispatch(getTotalWeek());
    dispatch(getTotalCategory());
  }, []);

  //Setting data of week totals as soon as week_totals is initialised as weekly total chart is default
  useEffect(() => {
    setData(week_totals);
  }, [week_totals]);

  //If week/category totals are not loaded yet, null page returned
  if (week_totals.length === 0 || category_totals.length === 0) {
    return null;
  }

  return (
    <Layout sidebar>
      <Fragment>
        <br></br>
        <Tabs
          activeKey={key}
          className='mb-3'
          onSelect={(k) => {
            setKey(k);
            k === 'week' && setData(week_totals);
            k === 'category' && setData(category_totals);
          }}
        >
          <Tab eventKey='week' title='Weekly Total'>
            <WeekTotals data={data} />
          </Tab>
          <Tab eventKey='category' title='Monthly Category Total'>
            <CategoryTotals data={data} />
          </Tab>
        </Tabs>
      </Fragment>
    </Layout>
  );
};

export default Report;
