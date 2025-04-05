import axios from "axios";
import { getFromStorage } from "../storage/Storage";

export const initAxios = () => {
  axios.defaults.baseURL = "http://localhost:3000"; // TODO: must be in env

  axios.interceptors.request.use(function (config) {
    const token = getFromStorage("token", "");
    config.headers.Authorization = token;
    return config;
  });
};
