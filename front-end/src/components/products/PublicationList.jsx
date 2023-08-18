import React from "react";
import { usePublications } from "../../context/PublicationContext";
import { ButtonLink } from "../ui";

export function PublicationList({ publications }) {
  const { deletePublication } = usePublications();

  return (
    <table className="border-collapse border border-black mx-auto">
      <thead className="bg-red-800">
        <tr>
          <th className="border-black border-4 p-2 text-xl text-black">#</th>
          <th className="border-black border-4 p-2 text-xl text-black"><b>CODIGO del Producto</b></th>
          <th className="border-black border-4 p-2 text-xl text-black"><b>Nombre del Producto</b></th>
          <th className="border-black border-4 p-2 text-xl text-black"><b>Precio</b></th>
          <th className="border-black border-4 p-2 text-xl text-black"><b>Stock</b></th>
          <th className="border-black border-4 p-2 text-xl text-black"><b>Botones</b></th>
        </tr>
      </thead>
      <tbody className="bg-slate-200">
        {publications.map((publication, index) => (
          <tr key={publication._id}>
            <td className="border-black border-4 p-2 text-xl text-black">{index + 1}</td>
            <td className="border-black border-4 p-2 text-black">{publication._id}</td>
            <td className="border-black border-4 p-2 text-black">{publication.nombre}</td>
            <td className="border-black border-4 p-2 text-black">$ {publication.precio}</td>
            <td className="border-black border-4 p-2 text-black">{publication.stock}</td>
            <td className="border-black border-4 p-2 text-black">
              <ButtonLink to={`/product/${publication._id}`}>Edit</ButtonLink>
              <button onClick={() => deletePublication(publication._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
