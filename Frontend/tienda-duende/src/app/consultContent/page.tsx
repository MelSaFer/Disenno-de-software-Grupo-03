"use client";
import Link from "next/link";
import React from "react";
import Footer from "../../components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Navigation from "../../components/Navbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../components/modal";

const ConsultContent = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.get(
          "https://images.unsplash.com/photo-1697110146398-88ecdf64168e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NzkzMjI1Nw&ixlib=rb-4.0.3&q=80&w=500",
          {
            responseType: "arraybuffer",
          }
        );

        // Verificar que la respuesta tenga un tipo de contenido válido
        const contentType = response.headers["content-type"];
        if (contentType.startsWith("image/")) {
          const imageBlob = new Blob([response.data], { type: contentType });
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageSrc(imageUrl);

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
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <header className="mb-20">
          <Navigation />
        </header>
        <main className="flex-grow">
          <div className="flex h-full justify-center items-top">
            {/* Columna izquierda con la imagen */}
            <div className=" flex justify-center items-center w-1/3 p-2 mr-4 border">
              <img src={imageSrc} alt="Imagen" className="w-full h-auto" />
            </div>

            {/* Columna derecha con el título y descripción */}
            <div className="w-1/3 p-5 border rounded-lg border-red-400 ml-4 text-yellow-900 flex flex-col justify-top">
              <div className="flex justify-end items-end ">
                <a
                  href="#!"
                  className=" text-neutral-800 dark:text-neutral-200"
                >
                  <BsThreeDotsVertical className="w-6 h-6 text-yellow-900" />
                </a>
              </div>
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
      <Modal />
    </Fragment>
  );
};

export default ConsultContent;
