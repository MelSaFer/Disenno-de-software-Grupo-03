// @ts-nocheck
"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Footer from "../../../../../components/footer";
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

function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Establece la zona horaria a la que deseas convertir la fecha
  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleString(undefined, options);

  return formattedDate;
}

const ConsultProduct = ({ params }: PageProps) => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { _id: params.id };
      console.log("Estos son los parametros:", params.id);
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getContent,
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
  }, [params.id]);

  console.log("Este es el data:", data.tags);

  const handleSubmit = async (e) => {
    // Agregar lógica de manejo de submit aquí
    console.log("agregar al carrito");
  };

  const handleDelete = async () => {
    try {
      const requestData = { _id: params.id };
      const result = await axios.request({
        method: "delete",
        url: Routes.deleteContent,
        headers: { "Content-Type": "application/json" },
        data: requestData,
      });
      if (result.status === 200) {
        router.push("/adminView/galleryAdmin");
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
        <main className="flex-grow">
          <div className="flex h-full justify-center items-top">
            {/* Columna izquierda con la imagen */}
            <div className="flex justify-center items-center w-1/3 p-2 mr-4 border">
              <img src={data.imageId} alt="Imagen" className="w-full h-auto" />
            </div>

            {/* Columna derecha con el título y descripción */}
            <div className="w-1/3 p-5 border rounded-lg border-red-400 ml-4 text-yellow-900 flex flex-col justify-top">
              <div className="flex justify-end items-end">
                <a
                  className=" text-neutral-800 dark:text-neutral-200"
                  onClick={() => setShowModal(true)}
                >
                  <BsThreeDotsVertical className="w-6 h-6 text-yellow-900" />
                </a>
              </div>
              <h1 className="font-bold text-2xl mb-4">{data.title}</h1>
              <p className="mb-4">{data.description}</p>
              <p className="mb-4">
                <b>TAGS: </b>
                {/* {data.tags ? (
              data.tags.map((tag, index) => (
                <p key={index}>#{tag}</p>
              ))
            ) : null} */}
                {data.tags
                  ? data.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{ display: "inline-block", margin: "0 5px" }}
                      >
                        #{tag}
                      </span>
                    ))
                  : null}
              </p>
              <p>
                <b>Fecha: </b>
                {formatDate(data.date)}
              </p>
              <div className="flex flex-wrap">
                {/* {data.
                ? data.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", margin: "0 5px" }}
                    >
                      #{tag}
                    </span>
                  ))
                : null} */}
                <div className="basis-1/4 text-center mx-1 bg-white text-red-400 font-semibold rounded-full border border-red-400 py-2 mt-5 ">
                  Cas
                </div>
                <div className="basis-1/4 text-center mx-1 bg-white text-red-400 font-semibold rounded-full border border-red-400 py-2 mt-5 ">
                  Cas
                </div>
                <div className="basis-1/4 text-center mx-1 bg-white text-red-400 font-semibold rounded-full border border-red-400  py-2 mt-5 ">
                  Cas
                </div>
                <div className="basis-1/4 text-center mx-1 bg-white text-red-400 font-semibold rounded-full border border-red-400  py-2 mt-5 ">
                  Cas
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-2 flex flex-col justify-center items-center">
          <Link href={`/adminView/modifyContent/${params.id}`}>
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
            ¿Está segura que desea eliminar la publicación?
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

export default ConsultProduct;
