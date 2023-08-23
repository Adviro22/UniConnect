import { useEffect } from "react";
import { usePublications } from "../context/PublicationContext";
import { PublicationCard } from "../components/products/PublicationCard";
import { ImFileEmpty } from "react-icons/im";

export default function GetProducts() {
  const { publications, getPublications } = usePublications();

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <div className="flex justify-center w-full h-screen">
      {publications.length === 0 ? (
        <div className="flex justify-center  p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No existen Publicaciones Ingresadas
            </h1>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {publications.map((publication) => (
            <PublicationCard publication={publication} key={publication._id} />
          ))}
        </div>
      )}
    </div>
  );
}
