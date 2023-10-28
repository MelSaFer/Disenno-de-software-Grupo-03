// @ts-nocheck
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "../../../../components/footer";
import axios from "axios";
import Navbar2 from "@/src/components/navbar2";
import * as Routes from "../../../routes";

interface PageProps {
  params: { id: string };
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
}

const ConsultProduct = ({ params }: PageProps) => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { _id: params.id };
      console.log("Estos son los parametros:", params.id);
      try {
        const result = await axios.request({
          method: "post",
          url: "http://localhost:3001/getContent",
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

  console.log("Este es el data:", data.tags);

  const handleSubmit = async (e) => {
    // Agregar lógica de manejo de submit aquí
    console.log("agregar al carrito");
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
            <h1 className="font-bold text-2xl mb-4">{data.title}</h1>
            <p className="mb-4">{data.description}</p>
            <p className="mb-4">
              <b>TAGS: </b>
              {/* {data.tags ? (
              data.tags.map((tag, index) => (
                <p key={index}>#{tag}</p>
              ))
            ) : null} */}
              {data.tags
                ? data.tags.map((tag, index) => (
                    <p
                      key={index}
                      style={{ display: "inline-block", margin: "0 5px" }}
                    >
                      #{tag}
                    </p>
                  ))
                : null}
            </p>
            <p>
              <b>Fecha: </b>
              {formatDate(data.date)}
            </p>
            <button
              type="submit"
              className="bg-white hover:bg-gray-50 text-red-400 font-semibold rounded-full border border-red-400 px-4 py-2 mt-5 w-full"
              onClick={handleSubmit}
            >
              Categorias?
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
