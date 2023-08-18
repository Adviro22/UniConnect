import axios from "./axios";

export const getPublicationsRequest = async () => axios.get("/product");

export const createPublicationsRequest = async (publication) => axios.post("/product", publication);

export const updatePublicationsRequest = async (id,publication) =>
  axios.put(`/product/${id}`, publication);

export const deletePublicationsRequest = async (id) => axios.delete(`/product/${id}`);

export const getPublicationRequest = async (id) => axios.get(`/product/${id}`);
