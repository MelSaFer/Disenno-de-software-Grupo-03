// @ts-nocheck
"use client";

import React from "react";
import Footer from "../../../components/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar2 from "@/src/components/navbar2";
import * as Routes from "../../routes";
import { auth } from "../../../firebase/config";

const Cart = () => {
  const [data, setData] = useState([]);
  const [costoTotal, setCostoTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });
  const [loading, setLoading] = useState(true);

  // obtains the user's uid and email
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

  /*
  receives a product and reduces the quantity you have in the cart. 
  Modify it in the database.
  */
  const reduceQuantity = async (product) => {
    try {
      const datosCart = {
        userId: authUser.uid, // cambiar por el userId del usuario logueado
        productId: product.additionalData.productId,
        quantity: parseInt(-1), // se resta uno
      };
      console.log(datosCart);
      const response = await axios.post(Routes.updateCart, datosCart);

      setQuantity(quantity - 1); // actualiza la ventana
    } catch (error) {
      console.error("Error al modificar el carrito:", error);
    }
  };

  /*
  receives a product and increases the quantity you have in the cart. 
  Modify it in the database.
  */
  const increaseQuantity = async (product) => {
    if (product.quantity >= 50) {
      alert("No puedes agregar más de 50 productos");
      return;
    }
    try {
      const datosCart = {
        userId: authUser.uid, // cambiar por el userId del usuario logueado
        productId: product.additionalData.productId,
        quantity: parseInt(1), // se suma uno
      };
      console.log(datosCart);
      const response = await axios.post(Routes.updateCart, datosCart);

      setQuantity(quantity + 1); // actualiza la ventana
    } catch (error) {
      console.error("Error al modificar el carrito:", error);
    }
  };

  /* 
  receives the data of the products in the cart and calculates the total cost of the purchase
  */
  function calcularCostoTotal(data) {
    let total = 0;
    for (const product of data) {
      const ProductCost = product.quantity * product.additionalData.price;
      total += ProductCost;
    }
    // return costoTotal;
    setCostoTotal(total);
  }

  /*
  receives the data of the products in the cart and calculates the total cost of the purchase
  */
  useEffect(() => {
    const fetchData = async () => {
      const requestData = { userId: authUser.uid }; // cambiar por el userId del usuario logueado
      // obtains the products in the cart
      console.log("Estos son los parametros:", requestData);
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getCart,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });

        // function to obtain additional data from each product
        function fetchProductData(product) {
          // make a request to the server to obtain the additional data
          return axios
            .post(Routes.getProductByName, { name: product.name })
            .then((response) => {
              // process the response
              const productData = response.data;

              // add the additional data to the product object
              product.additionalData = productData;

              return product;
            })
            .catch((error) => {
              console.error(
                `Error al obtener datos para ${product.name}: ${error.message}`
              );
              return product; // in case of error, return the product without additional data
            });
        }

        Promise.all(result.data.map(fetchProductData))
          .then((updatedData) => {
            // console.log(updatedData);
          })
          .catch((err) => {
            console.error(`Error en Promise.all: ${err}`);
          })
          .finally(() => {
            setLoading(false);
            setData(result.data);
            calcularCostoTotal(result.data);
          });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [quantity, authUser.uid]);

  // console.log(data);

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
                          onClick={() => increaseQuantity(item)}
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
                    <h1 className="text-3xl font-bold">$ {costoTotal}</h1>
                  </div>
                  <div className="w-2/3 text-black ">
                    <h1>
                      <Link href="/userView/shippingInfo">
                        <button
                          className="w-full text-red-500 bg-red-white border border-red-500  hover:bg-red-50 hover:border-gray-300 px-4 py-2 rounded-full"
                          href="/userView/shippingInfo"
                        >
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
