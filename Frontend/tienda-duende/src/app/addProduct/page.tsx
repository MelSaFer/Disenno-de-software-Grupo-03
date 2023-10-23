"use client";
import React from "react";
import Navbar2 from "@/src/components/navbar2";
import Footer from "@/src/components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";

const AddProduct = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState("");

  // datos utilizados para el formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");

  // @ts-ignore
  const handleImageChange = (e) => {
    // Captura la imagen seleccionada por el usuario
    const selectedImage = e.target.files[0];
    setImagen(selectedImage);

    // Crea una URL de objeto para la vista previa de la imagen
    const imageURL = URL.createObjectURL(selectedImage);

    setImagen(selectedImage);
    setImagenURL(imageURL);
  };

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre && descripcion && precio && imagen) {
      if (precio <= 0) {
        alert("El precio debe ser mayor a 0");
        return;
      }
      // Construye los datos para enviar a la API
      const datos = { nombre, descripcion, precio, imagen };

      // Envía una solicitud a la API (sustituye la URL por la de tu API real)
      try {
        const response = await fetch("URL_DE_LA_API", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Respuesta de la API:", data);
        } else {
          console.error("Error al enviar la solicitud a la API");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

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
            <div>
              <input
                type="file"
                id="imagen"
                name="imagen"
                className="w-full p-2 border rounded mb-5 mt-5"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagenURL && (
                <div>
                  <img
                    src={imagenURL}
                    alt="Vista previa de la imagen"
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha con el título y descripción */}
          <div className="w-1/3 p-5 ml-4 text-yellow-900 flex flex-col justify-top">
            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <label htmlFor="nombreProducto" className="font-semibold">
                  Nombre:
                </label>
                <input
                  className="border rounded-full w-[350px] border-red-300 ml-2 p-2"
                  type="text"
                  id="nombreProducto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="mb-10">
                <label htmlFor="descripcionProducto" className="font-semibold">
                  Descripcion:
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  // @ts-ignore
                  rows="4"
                  className="w-full p-2 border rounded border-red-300 mb-5 mt-5"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="precioProducto" className="font-semibold">
                  Precio:
                </label>
                <input
                  className="border rounded-full w-[250px] border-red-300 ml-2 p-2"
                  type="number"
                  id="precioProducto"
                  value={precio}
                  // @ts-ignore
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-red-400 text-white rounded-full px-3 py-2 mr-4"
                >
                  Guardar
                </button>
                <button
                  type="submit"
                  className="bg-red-400 text-white rounded-full px-3 py-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AddProduct;
