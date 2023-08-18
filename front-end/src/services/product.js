import axios from "./axios";

export const getProductsRequest = async () => axios.get("/product");

export const createProductsRequest = async (product) => axios.post("/product", product);

export const updateProductsRequest = async (id,product) =>
  axios.put(`/product/${id}`, product);

export const deleteProductsRequest = async (id) => axios.delete(`/product/${id}`);

export const getProductRequest = async (id) => axios.get(`/product/${id}`);
