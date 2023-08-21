import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { usePublications } from "../context/PublicationContext";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { uploadImageRequest } from "../services/publication"; // Importa el nuevo método
dayjs.extend(utc);

export default function FormPublication() {
  const { createPublication, getPublication, updatePublication } =
    usePublications();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const onSubmit = async (data) => {
    try {
      let finalImageUrl = imageUrl; // Utiliza la URL de imagen actual

      if (selectedImage) {
        // Si hay una nueva imagen, carga y obtén su URL
        const uploadedImageUrl = await uploadImageRequest(selectedImage);
        finalImageUrl = uploadedImageUrl;
      }

      const postData = {
        title: data.title,
        description: data.description,
        date: dayjs.utc(data.date).format(),
        image: finalImageUrl,
        // Agrega otros campos aquí si los tienes
      };

      if (params.id) {
        updatePublication(params.id, postData);
      } else {
        createPublication(postData);
      }

      navigate("/publications");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {
    const loadPublication = async () => {
      if (params.id) {
        const publication = await getPublication(params.id);
        setValue("title", publication.title);
        setValue("description", publication.description);
      }
    };
    loadPublication();
  }, [params.id]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Titulo</Label>
        <Input
          type="text"
          name="title"
          placeholder="Ingrese el Titulo de la publicacion"
          {...register("title", {
            required: { value: true, message: "Titulo es requerido" },
          })}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 font-semibold">{errors.title.message}</p>
        )}
        <Label htmlFor="description">Descripcion:</Label>
        <textarea
          type="text"
          name="description"
          placeholder="Escriba la descripcion..."
          className="bg-zinc-700"
          {...register("description", {
            required: { value: true, message: "Descripcion es requerido" },
          })}
        />
        {errors.description && (
          <p className="text-red-500 font-semibold">
            {errors.description.message}
          </p>
        )}

        <Label htmlFor="image">Imagen:</Label>
        <input type="file" name="image" onChange={handleImageChange} />
        {errors.image && (
          <p className="text-red-500 font-semibold">{errors.image.message}</p>
        )}

        <Button>Grabar Registro</Button>
      </form>
    </Card>
  );
}
