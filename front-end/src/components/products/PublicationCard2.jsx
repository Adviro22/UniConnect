// eslint-disable-next-line no-unused-vars
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
        console.error("Error al obtener el usuario:", error);
      });

    setCreatedAt(publication.createdAt);
  }, [publication.user, publication.createdAt]);

  return (
    <div className="bg-white rounded-lg shadow-md p-3 flex items-center justify-center">
      {publication.image && (
        <div className="w-1/3 pr-3">
          <img src={imageUrl} alt="Publicación" className="w-full h-auto rounded-md" />
        </div>
      )}
      <div className={publication.image ? "w-2/3 text-center" : "w-full text-center"}>
        <div className="bg-gray-800 text-white p-2 rounded-md mb-1">
          <h2 className="text-base font-semibold ">Usuario: {username}</h2>
          <p className="text-xs text-gray-400">Creado: {createdAt}</p>
        </div>
        <h1 className="text-xl font-bold text-black">{publication.title}</h1>
        <div className="mt-1">
          <p className="text-gray-600 text-sm">
            {publication.description}
          </p>
        </div>
      </div>
    </div>
  );
}
