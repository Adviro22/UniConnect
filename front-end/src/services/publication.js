// publication.js

import axios from "./axios";

export const getPublicationsRequest = async () => axios.get("/publication");

export const createPublicationsRequest = async (publication) => axios.post("/publication", publication);

export const updatePublicationsRequest = async (id, publication) =>
  axios.put(`/publication/${id}`, publication);

export const deletePublicationsRequest = async (id) => axios.delete(`/publication/${id}`);

export const getPublicationRequest = async (id) => axios.get(`/publication/${id}`);

// Nuevo método para cargar imágenes
export const uploadImageRequest = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post("/publication/saveimage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.imageUrl;
};
