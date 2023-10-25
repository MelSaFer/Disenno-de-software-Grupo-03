'use client'

import Navigation from "../../../components/Navbar";
import './agregarProducto.css';
import React, { useEffect, useState } from "react";

const page = () => {
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [direccion, setDireccion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Realiza el fetch para obtener la lista de elementos
    fetch("https://mocki.io/v1/d2409301-51ef-4c92-8822-5d3cecef023d")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.elementos); // Almacena los elementos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener elementos:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (provincia && canton && distrito && direccion && imagen) {
      // Construye los datos para enviar a la API
      const datos = { provincia, canton, distrito, direccion, imagen };

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

  const handleImageChange = (e) => {
    // Captura la imagen seleccionada por el usuario
    const selectedImage = e.target.files[0];
    setImagen(selectedImage);

    // Crea una URL de objeto para la vista previa de la imagen
    const imageURL = URL.createObjectURL(selectedImage);

    setImagenURL(imageURL);
  };

  return (
    <div className="page-container">
      <Navigation />
      <div className="content-container">
        <div className="flex justify-center items-center mb-3 mt-12">
          <h1 className="font-bold text-black text-3xl">FINALIZAR COMPRA</h1>
        </div>

        {/* Page content */}
        <div className="flex justify-center items-start">
          {/* Left column */}
          <div className="w-1/3 p-4">
            <div className="bg-gray-50 p-4 border">
              <h2 className="text-lg font-semibold text-black mb-8">
                Detalles de facturación
              </h2>

              {/* Resto del formulario y contenido... */}
            </div>
          </div>

          {/* Right column */}
          <div className="w-1/3 p-4">
            <div className="bg-white p-4 border">
              <h2 className="text-lg font-semibold text-black">Tu pedido</h2>
              {/* Resto del contenido... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
