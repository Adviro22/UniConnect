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

export const createPublication = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageFile = req.file || (req.files && req.files.image); // Ajusta para manejar ambos casos

    let image = ""; // Inicializa la variable para almacenar la ruta de la imagen

    if (imageFile) {
      // Procesa y guarda la imagen utilizando la función saveImage
      const savedImageName = await saveImage(imageFile); // Obtén el nombre de la imagen guardada
      image = savedImageName; // Asigna el nombre de la imagen a la propiedad image
    }

    const publication = new Publication({
      title,
      description,
      image, // Asigna la ruta de la imagen
      user: req.user.userId,
    });

    const publicationOk = await publication.save();

    res.status(200).json({ status: "registro ingresado ok", publicationOk });
  } catch (error) {
    console.error(error);
    console.log("Response:", error.response); // Agrega esta línea
    res.status(500).json({ message: "Error al insertar" });
  }
};


// Función para guardar la imagen en el servidor
export const saveImage = async (req, res) => {
  try {
    const imageFile = req.file; // req.file contiene la información del archivo subido
    if (!imageFile) {
      return res
        .status(400)
        .json({ message: "No se proporcionó ningún archivo" });
    }

    const timestamp = Date.now(); // Obtén el timestamp actual
    const extension = mimeTypes.extension(imageFile.mimetype);
    const filename = `${timestamp}_${imageFile.originalname}.${extension}`;
    
    const imagePath = path.join(currentDir, "Img", filename);

    await fs.promises.writeFile(imagePath, imageFile.buffer);

    return res.status(200).json({ message: "Imagen guardada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al guardar la imagen" });
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
