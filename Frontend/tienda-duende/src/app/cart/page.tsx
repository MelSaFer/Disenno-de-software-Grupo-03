"use client";
import React from "react";
import Footer from "../../components/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "firebase/database";
import Link from "next/link";

const Cart = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 999) {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/2fb7e454-fa6c-4617-afd5-948d2074487b"
        );
        const productoData = response.data.productos;
        setData(productoData);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto();
  }, []);

  console.log(data);

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
    getImage();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header></header>

      <main className="flex-grow">
        <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
        {/* Page content */}
        <div className="flex justify-center items-start">
          <div className="w-2/3 p-2 pl-11 flex-col text-yellow-900 ">
            {data.map((item) => (
              <div key={item.nombre} className="w-full flex p-2 pl-12 ">
                <div className="w-1/3 p-2 flex text-yellow-900 ">
                  <div className="w-50 h-auto overflow-hidden border border-gray-200">
                    <img
                      src={item.imagen}
                      alt="Imagen"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="w-2/3 p-4 flex-col text-yellow-900">
                  <h1 className="text-2xl font-bold mb-3">{item.nombre}</h1>
                  <p className="mb-2">{item.descripcion}</p>
                  <p>
                    <b>Precio:</b> ${item.precio}
                  </p>
                  <p className="mb-3">
                    <b>Cantidad:</b> {item.cantidad}
                  </p>
                  <div className="flex items-center">
                    <button
                      className="bg-white border text-yellow-900 px-2"
                      onClick={reduceQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={1}
                      max={999}
                      className="w-16 text-center border"
                      readOnly
                    />
                    <button
                      className="bg-white border text-yellow-900 px-2"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/3 p-2">
            <div className="bg-white flex-col p-4 ">
              <div className="w-2/3 text-black border border-yellow-900 text-yellow-900 rounded-lg mb-5 p-5">
                <h1 className="text-2xl">Total</h1>
                <h1 className="text-3xl font-bold">$ 100.00</h1>
              </div>
              <div className="w-2/3 text-black ">
                <h1>
                  <Link href="/shippingInfo">
                    <button className="w-full text-red-500 bg-red-white border border-red-500  hover:bg-red-50 hover:border-gray-300 px-4 py-2 rounded-full">
                      Finalizar compra
                    </button>
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Cart;
