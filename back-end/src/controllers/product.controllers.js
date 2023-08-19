import Publication from "../models/publication.model.js";

export const getPublications = async (req, res) => {
    const publications = await Publication.find({user: req.user.userId}).populate();
    console.log(publications)
    res.status(200).json(publications)
    
};

export const createPublication = async (req, res) => {
  try {
    // nota1, nota 2
     const { title,description } = req.body;
    console.log(req.body)
    const publication = new Publication({
      title,
      description,
      user: req.user.userId
    });
    console.log(publication)
    const publicationOk= await publication.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro ingresado ok",publicationOk});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al insertar" });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
     // Busca un estudiante por su ID y sui lo encuebtra lo elimina
    const publication = await Publication.findByIdAndDelete(id) ;
    if (!publication) {
      return res.status(404).json({ message: 'Publicacion no encontrado' });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error al eliminar la publicacion' });
  }
};

export const updatePublication = async (req, res) => {
     try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Buscar un estudiante por su ID en la base de datos
    const publicacion = await Publication.findById(id);
    if (!publicacion) {
      return res.status(404).json({ message: 'Publicacion no encontrado' });
    }
    // Actualizar el los datos del estudiante
    publicacion.title = title;
    publicacion.description = description;
    await publicacion.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro actualizado ok",publicacion});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar la Publicacion' });
  }
};

export const getPublication = async (req, res) => {
    try {
    const { id } = req.params;
    // Buscar un usuario por su ID en la base de datos
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ message: 'Publicacion no encontrado' });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(publication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener la Publicacion' });
    }
};
