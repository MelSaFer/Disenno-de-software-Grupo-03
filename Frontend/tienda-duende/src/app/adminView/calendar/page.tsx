// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
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
  const itemsPerPage = 15;

  // axios to get events
  useEffect(() => {
    // Request data from API using axios
    axios
      .post(Routes.getCalendar)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToDisplay = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(data.length / itemsPerPage);

  //to get the currentMonth (Later this gonna work to filter the calendar view)
  
  const getCurrentMonth = () => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
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

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar2 />
        <h2 className="mx-10 text-6xl font-bold mt-4">{currentMonth}</h2>
      </header>
      <section className="bg-white flex-grow">
        <div className="mx-auto max-w-screen-1xl px-4 sm:px-6 lg:px-8">
          <div className="col-span-4 mt-10 grid grid-cols-2 gap-8 sm:gap-4 lg:mt-7">
            {itemsToDisplay.map((item) => (
              <Link
              // to change border color based on the event type
              className={`relative flex flex-col overflow-hidden border-2 rounded-2xl cursor-pointer ${
                item.eventType === 'MAKEUP EVENT' ? 'border-red-500' :   // Cambiar 'tipo1' al valor correspondiente
                item.eventType === 'DELIVERY EVENT' ? 'border-blue-500' :  // Cambiar 'tipo2' al valor correspondiente
                'border-gray-500' // Color por defecto si no coincide con ningún tipo
              }`}
                key={item._id}
                item={item}
                href={`/adminView/consultEvent/${item._id}`}
                onClick={() => {
                  setSelectedItem(item);
                }}
                /*
                onClick={() => {
                  //console.log("Es estes")
                  router.push(`/consultProduct?datas=${item._id}`)
              }}
              */
              >
                {item.cuantityAv !== 0 ? (
                  <div>
                    <EventTile item={item} />
                    {/* <ProductButton item={item} /> */}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>

          <div className="pagination flex justify-center items-center mt-10 text-1xl ">
            {Array.from({ length: pageNumbers }, (_, index) => (
              <span
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`${
                  currentPage === index ? "active" : ""
                } border border-yellow-900 rounded-lg w-8 h-8 flex justify-center items-center text-yellow-900 hover:bg-gray-200 cursor-pointer mx-1`}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Page;
