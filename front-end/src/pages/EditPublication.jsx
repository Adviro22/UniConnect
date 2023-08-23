import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { usePublications } from "../context/PublicationContext";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function EditPublication() {
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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (params.id) {
        await updatePublication(params.id, formData);
      } else {
        await createPublication(formData);
      }

      navigate("/publications");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
        <Button>Grabar Registro</Button>
      </form>
    </Card>
  );
}
