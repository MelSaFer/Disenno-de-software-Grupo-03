"use client";
import Link from "next/link";
import Footer from "../../components/footer";
import React, { useState, useEffect } from "react";

const UserInfo = () => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => {
        const nombre = data.fact;
        setNombre(nombre);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <body className="flex flex-col min-h-screen">
      <header className="bg-green-200 py-5 mb-6"></header>
      <main className="flex-grow">
        <div className="font-bold text-4xl text-yellow-900 text-center mb-3">
          DUENDE MAQUILLISTA
        </div>
        <div className="flex items-start justify-center text-yellow-900 mb-20">
          <button className="bg-white border border-gray-300 hover:bg-gray-200 hover:border-gray-300 px-4 py-2 rounded">
            Tienda
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-200 hover:border-gray-300 px-4 py-2 rounded">
            Galería
          </button>
          <Link href="/admin">
            <button className="bg-white border border-gray-300 hover:bg-gray-200 hover:border-gray-300 px-4 py-2 rounded">
              Salir
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center text-yellow-900 mb-10">
          <h1 className="font-bold text-2xl">Nombre del usuario: </h1>
          <p>{nombre}</p>
          <h1 className="font-bold text-2xl">Correo electrónico:</h1>
          <p>{nombre}</p>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/admin">
            <button className=" text-white  bg-red-500  hover:bg-red-400 hover:border-gray-300 px-4 py-2 rounded-full">
              Historial de compras
            </button>
          </Link>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </body>
  );
};

export default UserInfo;
