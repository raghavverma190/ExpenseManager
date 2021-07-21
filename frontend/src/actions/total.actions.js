import axios from '../helpers/axios';
import { totalConstants } from './constants';

export const getTotalWeek = () => {
  return async (dispatch) => {
    dispatch({ type: totalConstants.GET_TOTAL_WEEK_REQUEST });
    //sending post request through axios to server
    const res = await axios.post(`getTotalWeek`);
    if (res.status === 200) {
      const { week_totals } = res.data;
      dispatch({
        type: totalConstants.GET_TOTAL_WEEK_SUCCESS,
        payload: { week_totals },
      });
    } else {
      const error = res.data.error;
      dispatch({
        type: totalConstants.GET_TOTAL_WEEK_FAILURE,
        payload: { error },
      });
    }
  };
};

export const getTotalCategory = () => {
  return async (dispatch) => {
    dispatch({ type: totalConstants.GET_TOTAL_CATEGORY_REQUEST });
    //sending post request through axios to server
    const res = await axios.post(`getTotalCategory`);
    if (res.status === 200) {
      const { category_totals } = res.data;
      dispatch({
        type: totalConstants.GET_TOTAL_CATEGORY_SUCCESS,
        payload: { category_totals },
      });
    } else {
      const error = res.data.error;
      dispatch({
        type: totalConstants.GET_TOTAL_CATEGORY_FAILURE,
        payload: { error },
      });
    }
  };
};
