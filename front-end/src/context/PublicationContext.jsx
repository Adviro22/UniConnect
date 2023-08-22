import { createContext, useContext, useState } from "react";
import {
  createPublicationsRequest,
  deletePublicationsRequest,
  getPublicationsRequest,
  getPublicationRequest,
  updatePublicationsRequest,
} from "../services/publication";

const PublicationContext = createContext();

export const usePublications = () => {
  const context = useContext(PublicationContext);
  if (!context) throw new Error("useProducts sin Contexto");
  return context;
};

export function PublicationProvider({ children }) {
  const [publications, setPublications] = useState([]);

  const getPublications = async () => {
    const res = await getPublicationsRequest();
    console.log(res.data)
    setPublications(res.data);
  };

  const deletePublication = async (id) => {
    try {
      const res = await deletePublicationsRequest(id);
      if (res.status === 204) setPublications(publications.filter((publication) => publication._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createPublication = async (publication) => {
    try {
      const res = await createPublicationsRequest(publication);
      console.log(publication)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPublication = async (id) => {
    try {
      const res = await getPublicationRequest(id);
      console.log(res)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePublication = async (id, publication) => {
    try {
      await updatePublicationsRequest(id, publication);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PublicationContext.Provider
      value={{
        publications,
        getPublications,
        deletePublication,
        createPublication,
        getPublication,
        updatePublication,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
}
