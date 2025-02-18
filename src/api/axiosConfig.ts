import axios from "axios";
import { store } from "../store";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    console.log("token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosInstance = instance;
