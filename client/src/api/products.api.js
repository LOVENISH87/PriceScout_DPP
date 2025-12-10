import request from "./axiosInstance.js";

export const fetchProducts = () => request("/products");

export const fetchLowestProducts = () => request("/products/lowest");
