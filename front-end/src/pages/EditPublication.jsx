// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { usePublications } from "../context/PublicationContext";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
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
  
  // Declare state for form values
  const [formValues, setFormValues] = useState({ title: "", description: "" });

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        title: data.title,
        description: data.description,
      };

      if (params.id) {
        await updatePublication(params.id, dataToSend);
      } else {
        await createPublication(dataToSend);
      }

      navigate("/allpublications");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadPublication = async () => {
      if (params.id) {
        const publication = await getPublication(params.id);
        setFormValues({ title: publication.title, description: publication.description });
      }
    };
    loadPublication();
  }, [params.id]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} encType="application/json">
        <Label htmlFor="title">Titulo</Label>
        <Input
          type="text"
          name="title"
          placeholder="Ingrese el Titulo de la publicacion"
          {...register("title", {
            required: { value: true, message: "Titulo es requerido" },
          })}
          value={formValues.title}
          onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
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
          value={formValues.description}
          onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
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
