import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    const productos = await Product.find({user: req.user.userId}).populate();
    console.log(productos)
    res.status(200).json(productos)
    
};

export const createProduct = async (req, res) => {
  try {
    // nota1, nota 2
     const { nombre,precio,stock } = req.body;
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingEst = await Product.findOne({ nombre });
    if (existingEst) {
      return res.status(400).json({ message: 'Ya existe un registro con el mismo nombre' });
    }
    console.log(req.body)
    const product = new Product({
      nombre,
      precio,
      stock,
      user: req.user.userId
    });
    console.log(product)
    const productOk= await product.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro ingresado ok",productOk});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al insertar" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
     // Busca un estudiante por su ID y sui lo encuebtra lo elimina
    const product = await Product.findByIdAndDelete(id) ;
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error al eliminar el producto' });
  }
};

export const updateProduct = async (req, res) => {
     try {
    const { id } = req.params;
    const { nombre, precio ,stock } = req.body;

    // Buscar un estudiante por su ID en la base de datos
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    // Actualizar el los datos del estudiante
    product.nombre = nombre;
    product.precio = precio;
    product.stock = stock;
    await product.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro actualizado ok",product});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Producto' });
  }
};

export const getProduct = async (req, res) => {
    try {
    const { id } = req.params;
    // Buscar un usuario por su ID en la base de datos
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Producto' });
    }
};
