// @ts-nocheck
"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Footer from "@/src/components/footer";
import axios from "axios";
import NavbarAdmin from "@/src/components/navbarAdmin";
import * as Routes from "../../../../routes";
import Modal from "../../../../../components/modal"; // overlay
import { BiMessageAdd } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { id: string };
}

const ConsultEvent = ({ params }: PageProps) => {
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { _id: params.id };
      //console.log("Estos son los parametros:", params.id);
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getEvent,
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
  }, []);

  // function that returns a formatted date in string format
  const formatearFecha = (cadenaTiempo) => {
    const fecha = new Date(cadenaTiempo);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Nota: los meses comienzan desde 0
    const año = fecha.getFullYear();

    // Agrega ceros a la izquierda si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const añoFormateado = año;

    return `${diaFormateado}/${mesFormateado}/${añoFormateado}`;
  };

  const getHourFromUTCString = (utcString) => {
    const date = new Date(utcString);

    const amPm = date.getUTCHours() >= 12 ? "PM" : "AM";

    date.setUTCHours(date.getUTCHours() - 6);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = (hours % 12 === 0 ? 12 : hours % 12)
      .toString()
      .padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

    return formattedTime;
  };

  const handleDelete = async () => {
    try {
      // const requestData = { _id: params.id };
      const requestData = { _id: params.id };
      const result = await axios.request({
        method: "delete",
        url: Routes.deleteEvent,
        headers: { "Content-Type": "application/json" },
        data: requestData,
      });
      if (result.status === 200) {
        router.push("/adminView/calendar");
      } else {
        console.error("Error al eliminar:", result);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <header>
          <NavbarAdmin />
          <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
        </header>
        <main className="flex-grow mt-16">
          <div className="flex h-full justify-center items-top text-yellow-900">
            <div className="border border-red-400 rounded-lg w-[40%] p-6 pl-9">
              <div className="flex justify-end items-end">
                <a
                  className=" text-neutral-800 dark:text-neutral-200"
                  onClick={() => setShowModal(true)}
                >
                  <BsThreeDotsVertical className="w-6 h-6 text-yellow-900 cursor-pointer" />
                </a>
              </div>
              <h1 className="font-bold text-2xl mb-4 underline">
                {data.eventType}: {data.name}
              </h1>
              <p>
                <strong className="text-xl italic">Fecha:</strong>{" "}
                {formatearFecha(data.date)}
              </p>
              <p>
                <strong className="text-xl italic">Cliente:</strong>{" "}
                {data.userId}
              </p>
              <p>
                <strong className="text-xl italic">Hora inicio:</strong>{" "}
                {getHourFromUTCString(data.startTime)}
              </p>
              <p>
                <strong className="text-xl italic">Hora fin:</strong>{" "}
                {getHourFromUTCString(data.endTime)}
              </p>
              <p>
                <strong className="text-xl italic">Ubicación:</strong>{" "}
                {data.location}
              </p>
              <p>
                <strong className="text-xl italic">Descripción:</strong>{" "}
                {data.description}
              </p>
            </div>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-2 flex flex-col justify-center items-center">
          <Link href={`/adminView/modifyEvent/${params.id}`}>
            <button className="w-[100px] text-yellow-900 border rounded border-yellow-900 bg-green-100 p-2 font-semibold mb-3">
              Modificar
            </button>
          </Link>
          <button
            className="w-[100px] text-yellow-900 border rounded border-yellow-900 bg-green-100 p-2 font-semibold"
            onClick={() => {
              setShowModal2(true), setShowModal(false);
            }}
          >
            Eliminar
          </button>
        </div>
      </Modal>
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div className="p-2 flex flex-col justify-center items-center">
          <h1 className="mb-7 text-yellow-900">
            ¿Está segura que desea eliminar el evento?
          </h1>
          <div>
            <button
              className="w-[100px] text-yellow-900 border rounded border-yellow-900 bg-green-100 p-2 font-semibold mr-14"
              onClick={() => setShowModal2(false)}
            >
              No
            </button>{" "}
            <button
              className="w-[100px] text-yellow-900 border rounded border-yellow-900 bg-green-100 p-2 font-semibold"
              onClick={handleDelete}
            >
              Si
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ConsultEvent;
