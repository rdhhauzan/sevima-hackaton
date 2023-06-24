import axios from "axios";

const apiCaller = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default apiCaller;
