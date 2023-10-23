// @ts-nocheck
"use client";
import Link from "next/link";
import React from "react";
import Footer from "../../components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Navbar2 from "@/src/components/navbar2";

const ConsultProduct = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.get(
          "https://source.unsplash.com/TCpfPxKPOvk/200x200",
          {
            responseType: "arraybuffer",
          }
        );

        // Verificar que la respuesta tenga un tipo de contenido válido
        const contentType = response.headers["content-type"];
        if (contentType.startsWith("image/")) {
          const imageBlob = new Blob([response.data], { type: contentType });
          const imageUrl = URL.createObjectURL(imageBlob);
          // setImageSrc(imageUrl);
          setImageSrc("https://source.unsplash.com/TCpfPxKPOvk/400x400");

          // `imageUrl` contiene la URL de la imagen que puedes usar en tu aplicación
          // console.log("URL de la imagen:", imageUrl);
        } else {
          console.error("La respuesta no es una imagen.");
        }
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      }
    };

    const obtenerProducto = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/5ebd6bfc-65ed-471b-88b4-5dca2cafcae0"
        );
        const productoData = response.data;
        setData(productoData);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto();
    getImage();
  }, []);

  console.log(data);

  const handleSubmit = async (e) => {};

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar2 />
        <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
      </header>
      <main className="flex-grow">
        <div className="flex h-full justify-center items-top">
          {/* Columna izquierda con la imagen */}
          <div className=" flex justify-center items-center w-1/3 p-2 mr-4 border">
            <img src={imageSrc} alt="Imagen" className="w-full h-auto" />
          </div>

          {/* Columna derecha con el título y descripción */}
          <div className="w-1/3 p-5 border rounded-lg border-red-400 ml-4 text-yellow-900 flex flex-col justify-top">
            <h1 className="font-bold text-2xl mb-4">{data.nombre}</h1>
            {/* <h1 className="text-2xl font-bold">{title}</h1> */}
            <p className="mb-4">{data.descripcion}</p>
            {/* <p className="mt-4">{description}</p> */}
            <p className="mb-4">
              <b>Precio: </b>
              {data.precio}
            </p>
            <p>
              <b>Cantidad disponible: </b>
              {data.cantidad_disponible}
            </p>
            <button
              type="submit"
              className="bg-white hover:bg-gray-50 text-red-400 font-semibold rounded-full border border-red-400 px-4 py-2 mt-5 w-full"
              onClick={handleSubmit}
            >
              Agregar a carrito
            </button>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ConsultProduct;
