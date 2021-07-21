import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';

const token = window.localStorage.getItem('token');

//Inititalizing axios instance
//Including user token in header which will be processed by the server to ensure user is logged in at the moment
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

axiosInstance.interceptors.request.use((req) => {
  //assign new token after login instead of old local storage token
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  //calling axios middlewares to handle password expiration bug
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS }); //cant access dispatch as outisde containers, hence we use store
    }
    return error.response;
  }
);

//can avoid try-catch if above two functions used

export default axiosInstance;
