import React, { useEffect } from "react";
import { usePublications } from "../context/PublicationContext";
import { ImFileEmpty } from "react-icons/im";
import { PublicationList } from "../components/products/PublicationList"; // Asegúrate de importar correctamente ProductList

export default function GetPublications() {
  const { publications, getPublications } = usePublications();

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <div className="table-container mx-auto">
      {publications.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No existen Publicaciones 
            </h1>
          </div>
        </div>
      )}

      {publications.length > 0 && <PublicationList publications={publications} />}
    </div>
  );
}
