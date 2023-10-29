// @ts-nocheck
"use client";

import React from "react";
import Footer from "../../components/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "firebase/database";
import Link from "next/link";
import Navbar2 from "@/src/components/navbar2";
import * as Routes from "../routes";
import { auth } from "../../firebase/config";

const Cart = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });
  const [loading, setLoading] = useState(true);

  const reduceQuantity2 = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 999) {
      setQuantity(quantity + 1);
    }
  };

  const reduceQuantity = async (product) => {
    console.log(product);
    try {
      const available = product.additionalData.cuantityAvailable - 1;
      const datos = {
        productId: product.additionalData.productId,
        name: product.additionalData.name,
        description: product.additionalData.description,
        cuantityAvailable: parseInt(available),
        imageId: product.additionalData.imageId,
        price: parseFloat(product.additionalData.price),
      };

      const response = await axios.put(Routes.modifyProduct, datos);
      console.log("Producto modificado:", response.data);
    } catch (error) {
      console.error("Error al modificar el carrito:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { userId: "1" };
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getCart,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });

        // Función para obtener datos adicionales para cada producto
        function fetchProductData(product) {
          // Realiza una solicitud a la API utilizando el nombre del producto
          return axios
            .post(Routes.getProduct, { productId: product.name })
            .then((response) => {
              // Procesa la respuesta y obtiene los datos adicionales
              const productData = response.data;

              // Agrega los datos adicionales al objeto del producto
              product.additionalData = productData;

              return product;
            })
            .catch((error) => {
              console.error(
                `Error al obtener datos para ${product.name}: ${error.message}`
              );
              return product; // En caso de error, devuelve el objeto sin datos adicionales
            });
        }

        Promise.all(result.data.map(fetchProductData))
          .then((updatedData) => {
            // La variable updatedProducts contendrá los objetos de productos actualizados con datos adicionales
            console.log(updatedData);
          })
          .catch((err) => {
            console.error(`Error en Promise.all: ${err}`);
          })
          .finally(() => {
            setLoading(false);
            setData(result.data);
          });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({ uid: user.uid, email: user.email });
        console.log(`El UID del usuario es ${user.uid} ${user.email}`);
      } else {
        console.log("No hay usuario iniciado sesión");
      }
    }, []);

    // Detener la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  console.log(data);

  // // Utiliza Promise.all para realizar las solicitudes en paralelo
  // Promise.all(data.map(fetchProductData))
  //   .then((updatedData) => {
  //     // La variable updatedProducts contendrá los objetos de productos actualizados con datos adicionales
  //     console.log(updatedData);
  //   })
  //   .catch((err) => {
  //     console.error(`Error en Promise.all: ${err}`);
  //   })
  //   .finally(() => {
  //     setLoading(false);
  //   });

  return (
    <div>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="flex flex-col min-h-screen">
          <header>
            <Navbar2 />
          </header>

          <main className="flex-grow">
            <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
            {/* Page content */}
            <div className="flex justify-center items-start">
              <div className="w-2/3 p-2 pl-11 flex-col text-yellow-900 ">
                {data.map((item) => (
                  <div key={item.name} className="w-full flex p-2 pl-12 ">
                    <div className="w-1/3 p-2 flex text-yellow-900 ">
                      <div className="w-50 h-auto overflow-hidden border border-gray-200">
                        <img
                          src={item.additionalData.imageId}
                          alt="Imagen"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div className="w-2/3 p-4 flex-col text-yellow-900">
                      <h1 className="text-2xl font-bold mb-3">{item.name}</h1>
                      <p className="mb-2">{item.additionalData.description}</p>
                      <p>
                        <b>Precio:</b> ${item.additionalData.price}
                      </p>
                      <p className="mb-3">
                        <b>Cantidad:</b>{" "}
                        <button
                          className="bg-white border text-yellow-900 px-2"
                          onClick={() => reduceQuantity(item)}
                        >
                          -
                        </button>{" "}
                        {item.quantity}
                        <button
                          className="bg-white border text-yellow-900 px-2 ml-2"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
                      </p>
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
      )}
    </div>
  );
};

export default Cart;
