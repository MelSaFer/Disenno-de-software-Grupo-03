// @ts-nocheck
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "../../../../../components/footer";
import axios from "axios";
import Navbar2 from "@/src/components/navbar2";
import * as Routes from "../../../../routes";
import { auth } from "../../../../../firebase/config";
import { useRouter } from "next/navigation";
interface PageProps {
  params: { id: string };
}

const ConsultProduct = ({ params }: PageProps) => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState("");
  const router = useRouter();

  //Firebase getCurrentUser
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({ uid: user.uid, email: user.email });
        //console.log(`El UID del usuario es ${user.uid} ${user.email}`);
      }
    }, []);

    // Detener la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { productId: params.id };
      console.log("Estos son los parametros:", params.id);
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getProduct,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });
        setData(result.data);
        console.log(result);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [params.id]);

  console.log("Este es el data:", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      userId: authUser.uid,
      productId: params.id,
      quantity: 1,
    };
    try {
      const result = await axios.request({
        method: "post",
        url: Routes.updateCart,
        headers: {
          "Content-Type": "application/json",
        },
        data: requestBody,
      });
      console.log(result.data);
      router.push("/userView/store");
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
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
          <div className="flex justify-center items-center w-1/3 p-2 mr-4 border">
            <img src={data.imageId} alt="Imagen" className="w-full h-auto" />
          </div>

          {/* Columna derecha con el título y descripción */}
          <div className="w-1/3 p-5 border rounded-lg border-red-400 ml-4 text-yellow-900 flex flex-col justify-top">
            <h1 className="font-bold text-2xl mb-4">{data.name}</h1>
            <p className="mb-4">{data.description}</p>
            <p className="mb-4">
              <b>Precio: </b>${data.price}
            </p>
            <p>
              <b>Cantidad disponible: </b>
              {data.cuantityAvailable}
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
