// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../components/footer";
import axios from "axios";
import Navbar2 from "@/src/components/navbar2";

const baseURL = "https://mocki.io/v1/2f52d417-4d0d-4ed4-8c97-97131eb8ceb6";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setHistory(response.data.pedidos);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar2 />
      </header>
      <main className="flex-grow ml-12 mr-12">
        {history.map((item) => (
          <div key={item.id} className="text-yellow-900">
            <hr className="border border-red-400 w-6/6 mx-auto my-4"></hr>
            <h1 className="text-2xl text-red-400 mb-2">Compra {item.id}</h1>
            <div className="pl-8">
              <h2 className="font-bold">Productos:</h2>
              <ul className="list-disc ml-8 mb-4">
                {item.productos.map((product) => (
                  <li key={product.nombre}>
                    {product.nombre} [x{product.cantidad}]
                  </li>
                ))}
              </ul>
              <h2 className="mb-3">
                <b>Total:</b> {item.precio}
              </h2>
              <h2 className="mb-3">
                <b>Direccion:</b> {item.direccion_entrega}
              </h2>
              <h2 className="mb-3">
                <b>Fecha:</b> {item.fecha_entrega}
              </h2>
            </div>
          </div>
        ))}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default History;
