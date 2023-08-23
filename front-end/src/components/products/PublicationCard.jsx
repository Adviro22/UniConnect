import React from "react";
import { usePublications } from "../../context/PublicationContext";
import { Button, ButtonLink, Card } from "../ui";

export function PublicationCard({ publication }) {
  const { deletePublication } = usePublications();
  const imageUrl = `http://localhost:5000/Img/${publication.image}`;

  return (
    <div className={`bg-gray-500 flex flex-col items-center justify-center h-100 p-10 rounded-md`}>
      <h1 className="text-2xl font-bold">{publication.title}</h1>
      <div className="mt-4">
        <p className="text-slate-300">
          {publication.description}
        </p>
      </div>
      <img src={imageUrl} alt="Publication" className="max-w-full h-auto custom-max-width mt-4" />
      <div className="mt-4 flex gap-x-2 items-center">
        <ButtonLink className="btn-edit" to={`/publication/${publication._id}`}>Edit</ButtonLink>
        <Button className="btn-delete" onClick={() => deletePublication(publication._id)}>Delete</Button>
      </div>
    </div>
  );
}
