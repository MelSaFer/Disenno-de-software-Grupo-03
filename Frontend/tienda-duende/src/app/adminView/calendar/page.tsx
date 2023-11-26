// @ts-nocheck
"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventTile from "../../../../components/EventTile";
import Footer from "@/src/components/footer";
import Navbar2 from "@/src/components/navbarCalendar";
import axios from "axios";
import Link from "next/link";
import * as Routes from "../../routes";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeButton, setActiveButton] = useState("button4"); // Inicializamos el estado con el primer botón activo
  const itemsPerPage = 1;
  const [pagedData, setPagedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  //const [itemsToDisplay, setItemsToDisplay] = useState([]);

  // No afecta
  const getEventsByPeriod = async (period) => {
    try {
      const response = await axios.post(Routes.filterCalendar, {
        filter: period,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllEvents = async () => {
    try {
      const response = await axios.post(Routes.getCalendar);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Función para obtener todos los eventos al cargar la página
  const getAllEventsOnLoad = async () => {
    try {
      const response = await axios.post(Routes.getCalendar);
      setData(response.data);
      setLoaded(true); // Marcar como cargado después de obtener los datos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Si afecta
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToDisplay = data.slice(indexOfFirstItem, indexOfLastItem);
  const itemsToDisplayAll = data.slice();
  console.log(itemsToDisplayAll);
  const eventsByPage = data[currentPage - 1]?.events || []; // Obtener eventos por página

  const pageNumbers = Math.ceil(data.length / itemsPerPage);
  const pageNumbersForAll = Math.ceil(data.length / 15);

  //to get the currentMonth (Later this gonna work to filter the calendar view)

  const getCurrentMonth = () => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    return months[currentMonth];
  };

  const currentMonth = getCurrentMonth();

  // handleClick for the different events
  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const handleButtonClick = async (button) => {
    setActiveButton(button);
    setCurrentPage(1);
    setLoading(true); // Activar el estado de carga

    // Crear una función asíncrona dentro de handleButtonClick para poder usar await
    const fetchData = async () => {
      try {
        //let updatedData;
        switch (button) {
          case "button1": // Semanal
            //updatedData = await getEventsByPeriod('Week');
            await getEventsByPeriod("Week");
            break;
          case "button2": // Mensual
            getEventsByPeriod("Month");
            break;
          case "button3": // Anual
            await getEventsByPeriod("Year");
            break;
          case "button4": // Ver todo
            await getAllEvents();
            break;
          default:
            break;
        }
        setDataLoaded(true); // Marcar los datos como cargados después de recibir la respuesta
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataLoaded(false); // En caso de error, marcar los datos como no cargados
      } finally {
        setLoading(false); // Desactivar el estado de carga después de recibir la respuesta
      }
    };

    fetchData(); // Llamar a la función asíncrona para ejecutar la lógica con await
  };

  // To load page
  useEffect(() => {
    // Ejecutar la función solo si no se ha cargado previamente
    if (!dataLoaded) {
      getAllEventsOnLoad();
    }
  }, [dataLoaded]); // Dependencia: solo se vuelve a ejecutar si "loaded" cambia

  useEffect(() => {
    // Si recibimos nuevos datos, reorganizamos la estructura paginada
    const organizeDataByPage = () => {
      const organizedData = [];

      // Dividir los eventos por objeto dentro del array data
      for (let i = 0; i < data.length; i++) {
        const eventsPerPage = data[i]?.events || []; // Obtener eventos por página
        organizedData.push(eventsPerPage);
      }

      setPagedData(organizedData);
    };
    organizeDataByPage(); // Llamar a la función al actualizar data
  }, [data]);

  // functions to format the date and display the week range
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("es-ES", options);
  };

  const formatDateRange = (dateRangeString) => {
    try {
      const [startString, endString] = dateRangeString
        .split("to")
        .map((str) => str.trim());

      const formattedStartDate = formatDate(startString);
      const formattedEndDate = formatDate(endString);

      return `${formattedStartDate} - ${formattedEndDate}`;
    } catch (error) {
      console.error("Error formatting date range:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar2 />
        <div className="mt-10 grid grid-cols-9 gap-2 sm:gap-2 lg:mt-7">
          <h2 className="mx-10 col-span-5 text-3xl font-bold ">
            {/* {currentMonth} */}
            {activeButton === "button1" ? (
              itemsToDisplay &&
              itemsToDisplay[0] && (
                <h1>{formatDateRange(itemsToDisplay[0]?.period)}</h1>
              )
            ) : activeButton === "button2" ? (
              itemsToDisplay &&
              itemsToDisplay[0] && <h1> {itemsToDisplay[0]?.period} </h1>
            ) : activeButton === "button3" ? (
              itemsToDisplay &&
              itemsToDisplay[0] && <h1>Año {itemsToDisplay[0]?.period}</h1>
            ) : activeButton === "button4" ? (
              <h1>Todos los eventos</h1>
            ) : (
              <h1>Contenido predeterminado</h1>
            )}
          </h2>
          <button
            className={`mx-2 p-2 mt-2 text-lg font-semibold rounded-lg focus:outline-none ${
              activeButton === "button1"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleButtonClick("button1")}
          >
            Semanal
          </button>
          <button
            className={`mx-2 p-2 mt-2 text-lg font-semibold rounded-lg focus:outline-none ${
              activeButton === "button2"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleButtonClick("button2")}
          >
            Mensual
          </button>
          <button
            className={`mx-2 p-2 mt-2 text-lg font-semibold rounded-lg focus:outline-none ${
              activeButton === "button3"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleButtonClick("button3")}
          >
            Anual
          </button>
          <button
            className={`mx-2 p-2 mt-2 text-lg font-semibold rounded-lg focus:outline-none ${
              activeButton === "button4"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleButtonClick("button4")}
          >
            Ver todo
          </button>
        </div>
      </header>
      <section className="bg-white flex-grow">
        <div className="mx-auto max-w-screen-1xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p>Cargando...</p>
          ) : activeButton === "button4" ? (
            <>
              {itemsToDisplayAll.map((item) => (
                <div
                  key={item}
                  className="col-span-4 mt-10 grid grid-cols-1 gap-8 sm:gap-4 lg:mt-7"
                >
                  <Link
                    // Cambiar el estilo de borde según el tipo de evento
                    className={`relative flex flex-col overflow-hidden border-2 rounded-2xl cursor-pointer ${
                      item.eventType === "MAKEUP EVENT"
                        ? "border-[#852fad]"
                        : item.eventType === "DELIVERY EVENT"
                        ? "border-[#d4340d]"
                        : "border-gray-500" // Color por defecto si no coincide con ningún tipo
                    }`}
                    key={item._id}
                    item={item}
                    href={`/adminView/consultEvent/${item._id}`}
                    onClick={() => {
                      setSelectedItem(item);
                    }}
                  >
                    <div>
                      <EventTile item={item} />
                      {/* <ProductButton item={item} /> */}
                    </div>
                  </Link>
                </div>
              ))}
              <div className="pagination flex justify-center items-center mt-10 text-1xl ">
                {Array.from({ length: pageNumbersForAll }, (_, index) => (
                  <span
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={`border border-yellow-900 rounded-lg w-8 h-8 flex justify-center items-center  hover:bg-gray-200 cursor-pointer mx-1 ${
                      currentPage === index + 1
                        ? "bg-yellow-900 text-white"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              {pagedData[currentPage - 1]?.map((item) => (
                <div
                  key={item}
                  className="col-span-4 mt-10 grid grid-cols-1 gap-8 sm:gap-4 lg:mt-7"
                >
                  <Link
                    // Cambiar el estilo de borde según el tipo de evento
                    className={`relative flex flex-col overflow-hidden border-2 rounded-2xl cursor-pointer ${
                      item.eventType === "MAKEUP EVENT"
                        ? "border-[#852fad]"
                        : item.eventType === "DELIVERY EVENT"
                        ? "border-[#d4340d]"
                        : "border-gray-500" // Color por defecto si no coincide con ningún tipo
                    }`}
                    key={item._id}
                    item={item}
                    href={`/adminView/consultEvent/${item._id}`}
                    onClick={() => {
                      setSelectedItem(item);
                    }}
                  >
                    <div>
                      <EventTile item={item} />
                      {/* <ProductButton item={item} /> */}
                    </div>
                  </Link>
                </div>
              ))}
              <div className="pagination flex justify-center items-center mt-10 text-1xl ">
                {Array.from({ length: pageNumbers }, (_, index) => (
                  <span
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={`border border-yellow-900 rounded-lg w-8 h-8 flex justify-center items-center  hover:bg-gray-200 cursor-pointer mx-1 ${
                      currentPage === index + 1
                        ? "bg-yellow-900 text-white"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Page;
