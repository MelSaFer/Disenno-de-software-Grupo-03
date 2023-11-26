// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductButton from "../../../../components/ProductButtons";
import ProductTile from "../../../../components/ProductTile";
//import Filters from "../../../components/Filters";
import Footer from "@/src/components/footer";
import Navbar2 from "@/src/components/navbar2";
import axios from "axios";
import Link from "next/link";
import * as Routes from "../../routes";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Request data from API using axios
    axios
      .get(Routes.getCatogue)
      //axios.get('https://localhost:3002/getAllContent')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedItem !== null) {
      console.log("El selectedItem y su info", selectedItem);
    }
  }, [selectedItem]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToDisplay = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(data.length / itemsPerPage);

  const handleClick = (number) => {
    setCurrentPage(number);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar2 />
      </header>
      <section className="bg-white py-12 sm:py-16 flex-grow">
        <div className="mx-auto max-w-screen-1xl sm:px-6 lg:px-2">
          <div className="flex justify-center items-center pl">
            <div className="grid grid-cols-5">
              {/* <div className="col-span-1 mt-7">
              <Filters />
            </div> */}

              <div className="col-span-5 mt-10 grid grid-cols-3 gap-8 sm:gap-4 lg:mt-7">
                {itemsToDisplay.map((item) => (
                  <Link
                    className="relative flex flex-col overflow-hidden border cursor-pointer"
                    key={item.code}
                    item={item}
                    //href = '/consultProduct/'
                    href={`/userView/consultProduct/${item._id}`}
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
                        <ProductTile item={item} />
                        <ProductButton item={item} />
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pagination flex justify-center items-center mt-10 text-1xl">
            {Array.from({ length: pageNumbers }, (_, index) => (
              <span
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`${
                  currentPage === index ? "active" : ""
                } border border-yellow-900 rounded-lg w-8 h-8 flex justify-center items-center  hover:bg-gray-200 cursor-pointer mx-1`}
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
