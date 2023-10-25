// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductButton from "../../../components/ProductButtons";
import ProductTile from "../../../components/ProductTile";
import Filters from "../../../components/Filters";
import Footer from "@/src/components/footer";
import Navbar2 from "@/src/components/navbar2";

/*
const dummyData = [
  {
  code: 123213123,
  name: "Uno",
  description: "asdadasdasdasda",
  cuantityAv: 123,
  price: 1231,
  image: "https://firebasestorage.googleapis.com/v0/b/proyectodisenno-7d92d.appspot.com/o/ProfilePic.png?alt=media&token=dfa6f323-10cd-4634-bbdf-0139513659b1",
  },
  {
      code: 1213123,
      name: "Dos",
      description: "asdadasdasdasda",
      cuantityAv: 1,
      price: 1231,
      image: "https://firebasestorage.googleapis.com/v0/b/proyectodisenno-7d92d.appspot.com/o/ProfilePic.png?alt=media&token=dfa6f323-10cd-4634-bbdf-0139513659b1",
  },
  {
      code: 12123,
      name: "Tres",
      description: "asdadasdasdasda",
      cuantityAv: 1,
      price: 1231,
      image: "https://firebasestorage.googleapis.com/v0/b/proyectodisenno-7d92d.appspot.com/o/ProfilePic.png?alt=media&token=dfa6f323-10cd-4634-bbdf-0139513659b1",
  }
];
*/

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch data from an API
    fetch("https://mocki.io/v1/545cca0f-625d-4bf6-a971-d62bc2782135")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToDisplay = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(data.length / itemsPerPage);

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar2 />
      </header>
      <section className="bg-white py-12 sm:py-16 flex-grow">
        <div className="mx-auto max-w-screen-1xl px-4 sm:px-6 lg:px-8">
          <div className="form-control flex items-center mx-auto justify-center mb-8">
            <input
              name="search"
              placeholder="Search"
              className="input input-bordered rounded-md border border-gray-300 w-[300px] min-w-[100px]"
            />
          </div>

          <div className="grid grid-cols-5">
            <div className="col-span-1 mt-7">
              <Filters />
            </div>

            <div className="col-span-4 mt-10 grid grid-cols-3 gap-8 sm:gap-4 lg:mt-7">
              {itemsToDisplay.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item.code}
                  onClick={() => {
                    console.log(item.code);
                    router.push(`/consultProduct/${item.code}`);
                  }}
                >
                  {item.cuantityAv !== 0 ? (
                    <div>
                      <ProductTile item={item} />
                      <ProductButton item={item} />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          <div className="pagination flex justify-center items-center mt-10 text-1xl">
            {Array.from({ length: pageNumbers }, (_, index) => (
              <span
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`${
                  currentPage === index ? "active" : ""
                } border border-black w-8 h-8 flex justify-center items-center`}
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
