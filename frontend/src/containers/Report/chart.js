import * as React from 'react';
import { Fragment } from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';

const BarChart = (props) => {
  return (
    <Chart data={props.data}>
      <ArgumentAxis />
      <ValueAxis />

      <BarSeries
        valueField={props.valueField}
        argumentField={props.argumentField}
      />
      <Title text={props.title} />
      <Animation />
      <EventTracker />
      <Tooltip />
    </Chart>
  );
};

export default BarChart;
