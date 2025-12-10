import request from "./axiosInstance.js";

export const fetchShops = () => request("/shops");

