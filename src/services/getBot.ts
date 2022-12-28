import axios from 'axios';
import { GET_BOT_URL } from '../constants';

const api = axios.create({
  baseURL: GET_BOT_URL,
});

export default api;
