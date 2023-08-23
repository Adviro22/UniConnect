import Publication from "../models/publication.model.js";
import { currentDir } from "../app.js";
import mimeTypes from 'mime-types';
import path from "path";
import fs from "fs";

export const getPublications = async (req, res) => {
  const publications = await Publication.find({
    user: req.user.userId,
  }).populate();
  console.log(publications);
  res.status(200).json(publications);
};

export const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate();
    res.status(200).json(publications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las publicaciones" });
  }
};


export const createPublication = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageFile = req.file; // Usar req.file en lugar de req.body.image

    let imageName = "";

    if (imageFile) {
      const savedImageName = await saveImage(imageFile);
      imageName = savedImageName;
    }

    const publication = new Publication({
      title,
      description,
      image: imageName,
      user: req.user.userId,
    });

    const publicationOk = await publication.save();

    res.status(200).json({ status: "registro ingresado ok", publicationOk });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al insertar" });
  }
};


export const saveImage = async (file) => { // Cambio el nombre del parámetro a 'file'
  try {
    if (!file) {
      throw new Error("No se proporcionó ningún archivo"); // Lanzar una excepción en lugar de responder
    }

    const timestamp = Date.now();
    const extension = mimeTypes.extension(file.mimetype);
    const filename = `${timestamp}_${file.originalname}.${extension}`;
    
    const imagePath = path.join(currentDir, "Img", filename);

    await fs.promises.writeFile(imagePath, file.buffer);

    return filename; // Devolver el nombre del archivo guardado
  } catch (error) {
    console.error(error);
    throw new Error("Error al guardar la imagen"); // Lanzar una excepción en caso de error
  }
};


export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    // Busca un estudiante por su ID y sui lo encuebtra lo elimina
    const publication = await Publication.findByIdAndDelete(id);
    if (!publication) {
      return res.status(404).json({ message: "Publicacion no encontrado" });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ha ocurrido un error al eliminar la publicacion" });
  }
  return filename;
};

export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Buscar un estudiante por su ID en la base de datos
    const publicacion = await Publication.findById(id);
    if (!publicacion) {
      return res.status(404).json({ message: "Publicacion no encontrado" });
    }
    // Actualizar el los datos del estudiante
    publicacion.title = title;
    publicacion.description = description;
    await publicacion.save();

    // Enviar una respuesta al cliente
    res.status(200).json({ status: "registro actualizado ok", publicacion });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al actualizar la Publicacion" });
  }
};

export const getPublication = async (req, res) => {
  try {
    const { id } = req.params;
    // Buscar un usuario por su ID en la base de datos
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ message: "Publicacion no encontrado" });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(publication);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener la Publicacion" });
  }
};
