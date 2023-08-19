import { usePublications } from "../../context/PublicationContext";
import { Button, ButtonLink, Card } from "../ui";

export function PublicationCard({ publication }) {
  const { deletePublication } = usePublications();

  return (
    <div
      className={`bg-green-700 items-center text-center h-80 p-10 rounded-md`}
    >
      <div className="flex justify-between items-center text-center ">
        <h1 className="text-2xl font-bold w-full">{publication.nombre}</h1>
      </div>
      <div>
        <p className="text-slate-300">
          <span className="text-blue-800 font-bold">Precio: </span>{" "}
          {publication.precio}
        </p>
        <p className="text-slate-300">
          <span className="text-blue-800 font-bold">Stock: </span>{" "}
          {publication.stock}
        </p>
      </div>
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => deletePublication(publication._id)}>
          Delete
        </Button>
        <ButtonLink to={`/publication/${publication._id}`}>Edit</ButtonLink>
      </div>
    </div>
  );
}
