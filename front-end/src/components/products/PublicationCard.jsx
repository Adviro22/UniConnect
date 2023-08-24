import React, { useState, useEffect } from "react";
import { usePublications } from "../../context/PublicationContext";
import { Button, ButtonLink, Card } from "../ui";
import axios from "axios";

export function PublicationCard({ publication }) {
  const { deletePublication } = usePublications();
  const imageUrl = `http://localhost:5000/Img/${publication.image}`;

  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/user/${publication.user}`)
      .then(response => {
        const user = response.data;
        setUsername(user.username);
      })
      .catch(error => {
        console.error("Error fetching user:", error);
      });

    setCreatedAt(publication.createdAt);
  }, [publication.user, publication.createdAt]);

  return (
    <div className="bg-white rounded-lg shadow-md p-3 flex items-center">
      <div className="w-1/3 pr-3">
        {publication.image && (
          <img src={imageUrl} alt="Publicación" className="w-full h-auto rounded-md" />
        )}
      </div>
      <div className="w-2/3">
        <div className="bg-gray-800 text-white p-2 rounded-md mb-1">
          <h2 className="text-base font-semibold">Usuario: {username}</h2>
          <p className="text-xs text-gray-400">Creado: {createdAt}</p>
        </div>
        <h1 className="text-lg font-bold text-black">{publication.title}</h1>
        <div className="mt-1">
          <p className="text-gray-600 text-sm">
            {publication.description}
          </p>
        </div>
      <div className="mt-4 flex gap-x-2 items-center justify-center">
        <ButtonLink className="btn-edit" to={`/publication/${publication._id}`}>Edit</ButtonLink>
        <Button className="btn-delete" onClick={() => deletePublication(publication._id)}>Delete</Button>
      </div>
    </div>
    </div>
  );
}