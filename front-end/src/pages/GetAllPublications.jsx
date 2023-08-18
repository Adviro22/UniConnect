import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { ImFileEmpty } from "react-icons/im";
import { ProductList } from "../components/products/ProductList";

export default function GetProducts() {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="table-container mx-auto">
      {products.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No existen Publicaciones 
            </h1>
          </div>
        </div>
      )}

      {products.length > 0 && <ProductList products={products} />}
    </div>
  );
}
