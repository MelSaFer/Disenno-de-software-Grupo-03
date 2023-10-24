"use client";
import Link from "next/link";
import Footer from "../../components/footer";
import React, { useState, useEffect } from "react";
import Navbar2 from "@/src/components/navbar2";
import axios from "axios";
import * as Routes from "../routes";

const UserInfo = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { userId: 1 };
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getUserInfo,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });
        setNombre(result.data.userId);
        console.log(result);
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
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center text-yellow-900 mb-10">
          <h1 className="font-bold text-2xl">Nombre del usuario: </h1>
          <p>{nombre}</p>
          <h1 className="font-bold text-2xl">Correo electrónico:</h1>
          <p>{email}</p>
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
    </div>
  );
};

export default UserInfo;
