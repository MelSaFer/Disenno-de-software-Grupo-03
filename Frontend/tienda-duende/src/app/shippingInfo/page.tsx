// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navigation from "../../components/Navbar";
import Navbar2 from "@/src/components/navbar2";
import axios from "axios";
import * as Routes from "../routes";

const ShippingInfo = () => {
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [direccion, setDireccion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { userId: 1 };
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getCart,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });
        // const sorted = result.data.sort((a, b) => {
        //   return b.purchaseId - a.purchaseId;
        // });
        setProducts(result.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  console.log(products);

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

    setImagen(selectedImage);
    setImagenURL(imageURL);
  };

  return (
    <div>
      {/* Navbar component */}
      {/* <header className="bg-green-200 py-5 mb-6"></header> */}
      <div className="">
        <Navbar2 />

        {/* Page heading */}
        <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
        <div className="flex justify-center items-center mb-3 ">
          <h1 className="font-bold text-black text-3xl">FINALIZAR COMPRA</h1>
        </div>

        {/* Page content */}
        <div className="flex justify-center items-start">
          {/* Left column */}
          <div className="w-1/3 p-4">
            <div className="bg-gray-50 p-4 border ">
              <h2 className="text-lg font-semibold text-black mb-8">
                Detalles de facturación
              </h2>

              {/* ============================Provincia============================================= */}
              <form className="text-black" onSubmit={handleSubmit}>
                <label htmlFor="provincia">
                  Provincia<a className="text-red-600">*</a>
                </label>
                <input
                  type="text"
                  id="provincia"
                  name="provincia"
                  className="w-full p-2 border rounded mb-5 mt-5"
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                />
                {/* ============================Canton============================================= */}
                <label htmlFor="campo1">
                  Cantón<a className="text-red-600">*</a>
                </label>
                <input
                  type="text"
                  id="campo1"
                  name="campo1"
                  className="w-full p-2 border rounded mb-5 mt-5"
                  value={canton}
                  onChange={(e) => setCanton(e.target.value)}
                />
                {/* ============================Distrito============================================= */}
                <label htmlFor="campo1">
                  Distrito<a className="text-red-600">*</a>
                </label>
                <input
                  type="text"
                  id="campo1"
                  name="campo1"
                  className="w-full p-2 border rounded mb-5 mt-5"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                />
                {/* ============================Direccion============================================= */}
                <label htmlFor="campo2">
                  Dirección exacta<a className="text-red-600">*</a>
                </label>
                <textarea
                  id="campo2"
                  name="campo2"
                  rows="4"
                  className="w-full p-2 border rounded mb-5 mt-5"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
                {/* ============================Imagen============================================= */}
                <label htmlFor="imagen">Subir imagen de comprobante</label>
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
              </form>
            </div>
          </div>

          {/* Right column */}
          <div className="w-1/3 p-4">
            <div className="bg-white p-4 border ">
              <h2 className="text-lg font-semibold text-black">Tu pedido</h2>
              {/* internal columns */}
              <div className="flex text-black">
                {/* left column */}
                <div className="w-1/2 p-2">
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">Producto</p>
                    <div className="flex ">
                      <div className="w-2/3 p-2 justify-start items-start">
                        <div className="flex font-bold">
                          <ul className="list-none font-light">
                            {products.map((product) => (
                              <li key={product.productDescription}>
                                {product.productDescription}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="w-1/2 p-2 font-bold">
                          <p>x4</p>
                          <p>x3</p>
                          <p>x1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* right column */}
                <div className="w-1/2 p-2">
                  <p className="font-bold text-2xl">Subtotal</p>
                  <div className="flex text-black p-2">
                    <ul className="list-none font-light">
                      <li>$40</li>
                      <li>$45.05</li>
                      <li>$10</li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="border-t my-4" /> {/* Línea divisora horizontal */}
              {/* Pricing */}
              <div className="flex text-black">
                {/* left column */}
                <div className="flex flex-col justify-center items-end w-1/2 p-2 font-bold">
                  <p>Subtotal</p>
                  <p>Envío</p>
                  <p className="text-red-400">Total</p>
                </div>
                {/* right column */}
                <div className="w-1/2 p-2">
                  <p>$85.05</p>
                  <p>$5</p>
                  <p>$95.05</p>
                </div>
              </div>
              {/* send button */}
              <button
                type="submit"
                className="bg-white hover:bg-gray-50 text-red-400 font-semibold rounded-full border border-red-400 px-4 py-2 mt-5 w-full"
                onClick={handleSubmit}
              >
                Realizar pedido
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ShippingInfo;
