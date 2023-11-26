// @ts-nocheck
"use client";
import React from "react";
import NavbarAdmin from "@/src/components/navbarAdmin";
import Footer from "@/src/components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { set } from "firebase/database";
import Modal from "../../../../../components/modal"; // overlay
import Link from "next/link";
import * as Routes from "../../../../routes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { id: string };
}

const ModifyEvent = ({ params }: PageProps) => {
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

  useEffect(() => {
    async function fetchData() {
      const requestData = { _id: params.id };
      // const requestData = { _id: params.id };
      // console.log("Estos son los parametros:", params.id);
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getEvent,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });
        // setData(result.data);
        // console.log("El data es el siguiente:", data);
        console.log(result.data);

        // set the data to the form fields to be modified by the user and send to the backend
        setName(result.data.name);
        setDate(result.data.date);

        // set the date to the datepicker
        const utcDate = new Date(result.data.date);
        utcDate.setUTCHours(utcDate.getUTCHours() + 6);
        setSelectedDate(utcDate);
        setClient(result.data.userId);

        // set the start time to the timepicker
        const utcDate2 = new Date(result.data.startTime);
        utcDate2.setUTCHours(utcDate2.getUTCHours() + 6);
        setSelectedStartTime(utcDate2);
        setStartTime(result.data.startTime);

        // set the end time to the timepicker
        const utcDate3 = new Date(result.data.endTime);
        utcDate3.setUTCHours(utcDate3.getUTCHours() + 6);
        setSelectedEndTime(utcDate3);
        setEndTime(result.data.endTime);

        // set the location and description to the form fields
        setLocation(result.data.location);
        setDescription(result.data.description);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, []);

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
      // format the date and time to UTC format to send to the backend and verify the overlap
      const startTimeFormatted = new Date(startTime);
      startTimeFormatted.setUTCHours(startTimeFormatted.getUTCHours());
      const endTimeFormatted = new Date(endTime);
      endTimeFormatted.setUTCHours(endTimeFormatted.getUTCHours());
      const dateFormatted = new Date(date);
      dateFormatted.setUTCHours(dateFormatted.getUTCHours());

      startTimeFormatted.setFullYear(dateFormatted.getFullYear());
      startTimeFormatted.setMonth(dateFormatted.getMonth());
      startTimeFormatted.setDate(dateFormatted.getDate());
      startTimeFormatted.setSeconds(0);
      startTimeFormatted.setMilliseconds(0);
      endTimeFormatted.setFullYear(dateFormatted.getFullYear());
      endTimeFormatted.setMonth(dateFormatted.getMonth());
      endTimeFormatted.setDate(dateFormatted.getDate());
      endTimeFormatted.setSeconds(0);
      endTimeFormatted.setMilliseconds(0);

      const datos = {
        _id: params.id,
        userId: client,
        name: name,
        description: description,
        location: location,
        startTime: startTimeFormatted.toISOString(),
        endTime: endTimeFormatted.toISOString(),
        date: date,
        eventType: "MAKEUP EVENT",
      };

      console.log("Estos son los datos:", datos);

      // Enviar datos al backend
      const fetchData = async () => {
        try {
          const result = await axios.request({
            method: "put",
            url: Routes.updateEvent,
            headers: { "Content-Type": "application/json" },
            data: datos,
          });
          if (result.data.name === "Hay superposición con otro evento") {
            setOverlap(true);
            return;
          }
          router.push("/adminView/calendar");
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
                    <a href="/adminView/calendar" title="calendar">
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

export default ModifyEvent;
