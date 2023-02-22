import axios from "axios";
// import store from "../store";

const url = "http://192.168.20.25:3000";

const request = axios.create({
  baseURL: url,
  timeout: 5000,
});

export default request;
