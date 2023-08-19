import { usePublications } from "../../context/PublicationContext";
import { Button, ButtonLink, Card } from "../ui";

export function PublicationCard({ publication }) {
  const { deletePublication } = usePublications();

  return (
    <div
      className={`bg-gray-500 items-center text-center h-100 p-10 rounded-md`}
    >
      <div className="flex justify-between items-center text-center ">
        <h1 className="text-2xl font-bold w-full">{publication.title}</h1>
      </div>
      <div>
        <p className="text-slate-300">
          <span className="text-blue-800 w-full justify-center"></span>{" "}
          {publication.description}
        </p>
      </div>
      <div className="flex gap-x-2 items-center justify-center">
        <br />
        <br />
        <br />
        <br />
        <Button onClick={() => deletePublication(publication._id)}>
          Delete
        </Button>
        <ButtonLink to={`/publication/${publication._id}`}>Edit</ButtonLink>
      </div>
    </div>
  );
}
