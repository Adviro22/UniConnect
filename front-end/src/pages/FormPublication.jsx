import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { usePublications } from "../context/PublicationContext";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function FormPublication() {
  const { createPublication, getPublication, updatePublication } = usePublications();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updatePublication(params.id, {
          ...data,
          precio:parseFloat(data.precio),
          stock:parseFloat(data.stock),
          date: dayjs.utc(data.date).format(),
        });
      } else {
        console.log("al grabar:",data)
        createPublication({
          ...data,
          precio:parseFloat(data.precio),
          stock:parseFloat(data.stock),
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/publications");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    console.log(params.id)
    const loadProdct = async () => {
      if (params.id) {
        const student = await getPublication(params.id);
        setValue("nombre", student.nombre);
        setValue("precio", student.precio);
        setValue("stock", student.stock);
        
      }
    };
    loadProdct();
  }, []);

  return (
     <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          type="text"
          name="nombre"
          placeholder="Ingrese el Nombre del producto"
          {...register("nombre",{ required: {value:true,message:"Nombre es requerido"} })}
          autoFocus
        />
        {errors.nombre && (
          <p className="text-red-500 font-semibold">{errors.nombre.message}</p>
        )}
        <Label htmlFor="precio">Precio:</Label>
         <Input 
            type="number"
            name="precio"
            placeholder="Escriba el precio..."
            {...register("precio", { required: {value:true,message:"Precio es requerido"} })}
          />
          {errors.precio && (<p className="text-red-500 font-semibold">{errors.precio.message}</p>)}
         <Label htmlFor="stock">Stock:</Label>
          <Input 
            type="number"
            name="stock"
            placeholder="Escriba la stock..."
            {...register("stock", { required: {value:true,message:"Stock es requerido"} })}
          />
          {errors.stock && (<p className="text-red-500 font-semibold">{errors.stock.message}</p>)}
          
        <Button>Grabar Registro</Button>
      </form>
    </Card>
     );
}