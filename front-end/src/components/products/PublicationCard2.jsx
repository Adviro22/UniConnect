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
    <div className="bg-gray-500 flex flex-col items-center justify-center h-auto p-10 rounded-md">
      <div className="mb-2 text-center bg-black p-6">
        <h2 className="text-lg font-semibold">Usuario: {username}</h2>
        <p className="text-xs text-gray-400">Fecha de Creación: {createdAt}</p>
      </div>
      <h1 className="text-2xl font-bold text-center">{publication.title}</h1>
      <div className="mt-4 text-center">
        <p className="text-slate-300">
          {publication.description}
        </p>
      </div>
      <img src={imageUrl} alt="Publication" className="max-w-full h-auto mt-4" />
    </div>
  );
}
