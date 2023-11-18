// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import NavbarAdmin from "@/src/components/navbarAdmin";
import axios from "axios";
import Link from "next/link";
import * as Routes from "../../routes";

const NotificationCenterAdmin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarAdmin />
      </header>
      <main className="flex-grow justify-center items-center">
        <hr className="border border-red-400 w-5/6 mx-auto my-4 mb-10"></hr>
        <div className="flex flex-col justify-center items-center">
          <div className="flex-1 border-2 border-l-8 rounded-sm border-red-300 w-[40%] p-3 pl-7">
            <p className="font-light text-red-600 justify-end items-center">
              11/16/2023 21:36
            </p>
            <b>Tu pedido ha sido aprobado</b>
            <p className="text-gray-400">Número de pedido: 123441fiu3ng54i6</p>
            <p className="text-gray-400">
              Fecha de entrega aproximada: 11/16/2023
            </p>
          </div>
          <div className="border-2 border-l-8 rounded-sm border-red-300 w-[40%] p-3 pl-7">
            <p className="font-light text-red-600 justify-end items-center">
              11/16/2023 21:36
            </p>
            <b>Tu pedido ha sido aprobado</b>
            <p className="text-gray-400">Número de pedido: 123441fiu3ng54i6</p>
            <p className="text-gray-400">
              Fecha de entrega aproximada: 11/16/2023
            </p>
          </div>
          <div className="border-2 rounded-sm border-gray-200 w-[40%] p-3 pl-7">
            <p className="font-light text-red-600 justify-end items-center">
              11/16/2023 21:36
            </p>
            <b>Tu pedido ha sido rechazado</b>
            <p className="text-gray-400">Número de pedido: 123441fiu3ng54i6</p>
            <p className="text-gray-400">
              Pronto nos pondremos en contacto para la devolución de tu dinero
            </p>
          </div>
          <div className="border-2 rounded-sm border-gray-2-- w-[40%] p-3 pl-7">
            <p className="font-light text-red-600 justify-end items-center">
              11/16/2023 21:36
            </p>
            <b>Tu pedido ha sido aprobado</b>
            <p className="text-gray-400">Número de pedido: 123441fiu3ng54i6</p>
            <p className="text-gray-400">
              Fecha de entrega aproximada: 11/16/2023
            </p>
          </div>
          <div className="border-2 rounded-sm border-gray-2-- w-[40%] p-3 pl-7">
            <p className="font-light text-red-600 justify-end items-center">
              11/16/2023 21:36
            </p>
            <b>Tu pedido ha sido aprobado</b>
            <p className="text-gray-400">Número de pedido: 123441fiu3ng54i6</p>
            <p className="text-gray-400">
              Fecha de entrega aproximada: 11/16/2023
            </p>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default NotificationCenterAdmin;
