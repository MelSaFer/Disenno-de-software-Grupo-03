// @ts-nocheck
"use client";
import React from "react";
import NavbarAdmin from "@/src/components/navbarAdmin";
import Footer from "@/src/components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { set } from "firebase/database";
import Modal from "../../../components/modal"; // overlay
import Link from "next/link";
import * as Routes from "../../routes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

const AddEvent = () => {
  // datos utilizados para el formulario
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [client, setClient] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [overlap, setOverlap] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const today = new Date();
  const router = useRouter();

  // FUNCTION TO GET THE CURRENT DATE
  const handleDateChange = (date) => {
    console.log(date);
    // console.log(today);
    const dateOnly1 = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const dateOnly2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    if (dateOnly1 < dateOnly2) {
      alert("No puedes seleccionar fechas pasadas");
      return;
    }

    const utcDate = date;
    utcDate.setUTCHours(utcDate.getUTCHours() - 6);
    const formattedDate = utcDate.toISOString();
    console.log("formatted: " + formattedDate);
    setDate(formattedDate);

    setSelectedDate(date);
  };

  // FUNCTION TO GET THE START TIME
  const handleStartTimeChange = (time) => {
    const utcDate = new Date(time.getTime() - 3600000 * 6);
    const isoDate = utcDate.toISOString();
    setStartTime(isoDate);
    setSelectedStartTime(time);
    console.log(isoDate);
  };

  // FUNCTION TO GET THE END TIME
  const handleEndTimeChange = (time) => {
    const utcDate = new Date(time.getTime() - 3600000 * 6);
    const isoDate = utcDate.toISOString();
    if (time <= selectedStartTime) {
      alert(
        "La hora de finalización no puede ser menor o igual a la hora de inicio"
      );
      return;
    }
    setEndTime(isoDate);
    setSelectedEndTime(time);

    console.log(isoDate);
  };

  // FUNCTION TO SEND THE DATA TO THE BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, date, client, startTime, endTime, location, description);

    if (
      name &&
      date &&
      client &&
      startTime &&
      endTime &&
      location &&
      description
    ) {
      // Crear el objeto de datos
      const datos = {
        userId: "60f9b2b9c8b2a40015f6b3a5",
        name: name,
        description: description,
        location: location,
        startTime: startTime,
        endTime: endTime,
        date: date,
        // client: client,
        eventType: "MAKEUP EVENT",
      };

      console.log("Estos son los datos:", datos);

      // Enviar datos al backend
      const fetchData = async () => {
        try {
          const result = await axios.request({
            method: "post",
            url: Routes.verifyOverlap,
            headers: { "Content-Type": "application/json" },
            data: {
              startTime: startTime,
              endTime: endTime,
            },
          });

          console.log(result.data);
          //   router.push("/adminView/calendar");
          if (result.data === true) {
            setOverlap(true);
            return;
          } else {
            try {
              const result = await axios.request({
                method: "post",
                url: Routes.createEvent,
                headers: { "Content-Type": "application/json" },
                data: datos,
              });
              console.log(result);
              router.push("/adminView/calendar");
            } catch (error) {
              console.error("Error al obtener datos:", error);
            }
          }
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      // enviar datos
      fetchData();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <header>
          <NavbarAdmin />
          <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
        </header>
        <main className="flex-grow">
          <div className="flex h-full justify-center items-top">
            <div className="w-1/3 p-5 ml-4 text-yellow-900 flex flex-col justify-top">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="contentName" className="font-semibold">
                    Nombre:
                  </label>
                  <input
                    className="border rounded-full w-[350px] border-red-300 ml-2 p-2"
                    type="text"
                    placeholder="Ingrese el nombre del evento"
                    id="eventName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contentDescription" className="font-semibold">
                    Fecha:
                  </label>

                  <DatePicker
                    className="border rounded-full w-[350px] border-red-300 ml-2 p-2 cursor-pointer"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect={false}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd "
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="precioProducto" className="font-semibold">
                    Cliente:
                  </label>
                  <input
                    className="border rounded-full w-[350px] border-red-300 ml-2 p-2"
                    type="text"
                    placeholder="Ingrese el nombre del cliente"
                    id="eventClient"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contentDescription" className="font-semibold">
                    Hora de inicio:
                  </label>

                  <DatePicker
                    className="border rounded-full w-[300px] border-red-300 ml-2 p-2 cursor-pointer"
                    selected={selectedStartTime}
                    onChange={handleStartTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="HH:mm:ss"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contentDescription" className="font-semibold">
                    Hora de finalización:
                  </label>

                  <DatePicker
                    className="border rounded-full w-[250px] border-red-300 ml-2 p-2 cursor-pointer"
                    selected={selectedEndTime}
                    onChange={handleEndTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="HH:mm:ss"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="precioProducto" className="font-semibold">
                    Ubicación:
                  </label>
                  <input
                    className="border rounded-full w-[350px] border-red-300 ml-2 p-2"
                    type="text"
                    placeholder="Ingrese la ubicación del evento"
                    id="eventLocation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="precioProducto" className="font-semibold">
                    Descripción:
                  </label>
                  <textarea
                    id="clave"
                    name="clave"
                    rows="4"
                    placeholder="Ingrese la descripción del evento"
                    className="w-full p-2 border rounded border-red-300 mb-5 mt-5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="w-[150px] bg-red-400 text-white rounded-full px-3 py-2 mr-4 "
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="w-[150px] bg-red-400 text-white rounded-full px-3 py-2"
                  >
                    <a href="/adminView/galleryAdmin" title="galeria">
                      Cancelar
                    </a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
      <Modal isVisible={overlap} onClose={() => setOverlap(false)}>
        <div className="p-2 flex flex-col justify-center items-center">
          <h1 className="text-yellow-900 mb-6">
            El evento que desea crear tiene choque de horas con otro evento
            existente. Debe cambiar la hora de inicio y de finalizar para evitar
            el conflicto.
          </h1>

          <button
            className="w-[100px] text-yellow-900 border rounded border-yellow-900 bg-green-100 p-2 font-semibold mb-3"
            onClick={() => {
              setOverlap(false);
            }}
          >
            Editar
          </button>
          <Link href={`/adminView/calendar/`}>
            <button
              className="w-[100px] text-yellow-900 border rounded border-yellow-900 bg-green-100 p-2 font-semibold"
              onClick={() => {
                setOverlap(false);
              }}
            >
              Cancelar
            </button>
          </Link>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AddEvent;
