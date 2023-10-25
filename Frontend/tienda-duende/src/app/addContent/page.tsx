// @ts-nocheck
"use client";
import React from "react";
import Navbar2 from "@/src/components/navbar2";
import Footer from "@/src/components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { set } from "firebase/database";

const AddContent = () => {
  const [imageSrc, setImageSrc] = useState("");

  // datos utilizados para el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [keyFormat, setKeyFormat] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");

  const handleImageChange = (e) => {
    // Captura la imagen seleccionada por el usuario
    const selectedImage = e.target.files[0];
    setImagen(selectedImage);

    // Crea una URL de objeto para la vista previa de la imagen
    const imageURL = URL.createObjectURL(selectedImage);

    setImagen(selectedImage);
    setImagenURL(imageURL);
  };

  const handleValidateTags = () => {
    const regex = /#[^\s#]+/g;
    const matches = keyWords.match(regex);

    if (matches && matches.join("") === keyWords) {
      const valTags = matches.join(" ");
      console.log("Tags válidos:", valTags);
      setKeyFormat(true);
    } else {
      console.log("Los tags no siguen el formato correcto");
      setKeyFormat(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && description && keyWords && imagen) {
      // Construye los datos para enviar a la API
      handleValidateTags();
      if (!keyFormat) {
        alert(
          "Los tags no siguen el formato correcto. Por favor, intente de nuevo."
        );
        return;
      }
      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formatedDate = `${day}/${month}/${year}`;

      const datos = {
        title: name,
        description: description,
        date: formatedDate,
        imageId: "imagen",
        categoryName: "",
        keyWords: keyWords,
      };
      console.log(datos);

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
                <label htmlFor="contentName" className="font-semibold">
                  Nombre:
                </label>
                <input
                  className="border rounded-full w-[350px] border-red-300 ml-2 p-2"
                  type="text"
                  id="contentName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contentDescription" className="font-semibold">
                  Descripcion:
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="w-full p-2 border rounded border-red-300 mt-5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="precioProducto" className="font-semibold">
                  Palabras clave:
                </label>
                <textarea
                  id="clave"
                  name="clave"
                  rows="4"
                  placeholder="Ingrese los tags en formato: #tag#tag#tag"
                  className="w-full p-2 border rounded border-red-300 mb-5 mt-5"
                  value={keyWords}
                  onChange={(e) => setKeyWords(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-center mb-5">
                <button
                  type="submit"
                  className="bg-gray-100 text-red-400 border border-red-300 rounded-full px-3 py-2 mr-4 hover:bg-gray-200 w-full"
                >
                  +Agregar Categoria
                </button>
                <button
                  type="submit"
                  className="bg-gray-100 text-red-400 border border-red-300 rounded-full px-3 py-2 mr-4 hover:bg-gray-200 w-full"
                >
                  +Agregar subcategoria
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="w-[150px] bg-red-400 text-white rounded-full px-3 py-2 mr-4 "
                  onClick={handleSubmit}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="w-[150px] bg-red-400 text-white rounded-full px-3 py-2"
                >
                  <a href="/gallery" title="galeria">
                    Cancelar
                  </a>
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

export default AddContent;
