// @ts-nocheck
"use client";
import React, { Fragment, useEffect, useState } from "react";
import Footer from "../../../../../components/footer";
import axios from "axios";
import NavbarAdmin from "@/src/components/navbarAdmin";
import * as Routes from "../../../../routes";
import Modal from "../../../../../components/modal";
import { auth } from "../../../../../firebase/config";
import { BiMessageAdd } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

const ConsultProductAdmin = ({ params }: PageProps) => {
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const router = useRouter();

  //Firebase getCurrentUser
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({ uid: user.uid, email: user.email });
        //console.log(`El UID del usuario es ${user.uid} ${user.email}`);
      }
    }, []);

    // Detener la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { productId: params.id };
      console.log("Estos son los parametros:", params.id);
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getProduct,
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

  console.log("Este es el data:", data);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const requestBody = {
  //     userId: authUser.uid,
  //     productId: params.id,
  //     quantity: 1
  //   };
  //   try {
  //     const result = await axios.request({
  //       method: "post",
  //       url: Routes.updateCart,
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       data: requestBody
  //     });
  //     console.log(result.data);
  //   } catch (error) {
  //     console.error("Error al actualizar el carrito:", error);
  //   }
  // };

  const handleDelete = async () => {
    // Hacer la solicitud DELETE al servidor
    try {
      const requestData = { productId: params.id };
      const result = await axios.request({
        method: "delete",
        url: Routes.deleteProduct,
        headers: { "Content-Type": "application/json" },
        data: requestData,
      });
      // Si la solicitud DELETE se realizó con éxito
      if (result.status === 200) {
        // Realiza cualquier acción necesaria después de la eliminación
        // Puede ser redirigir a otra página o actualizar el estado de la aplicación, por ejemplo
        router.push("/adminView/storeAdmin");
      } else {
        // Manejar errores o mostrar mensajes de error
        console.error("Error al eliminar:", result);
      }
    } catch (error) {
      // Manejar errores de Axios
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
              <h1 className="font-bold text-2xl mb-4">{data.name}</h1>
              <p className="mb-4">{data.description}</p>
              <p className="mb-4">
                <b>Precio: </b>${data.price}
              </p>
              <p>
                <b>Cantidad disponible: </b>
                {data.cuantityAvailable}
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
          <Link href={`/adminView/modifyProduct/${params.id}`}>
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
            <button className="w-[100px] text-yellow-900 border rounded border-yellow-900 bg-green-100 p-2 font-semibold mr-14">
              No
            </button>
            <button
              className="w-[100px] text-yellow-900 border rounded border-yellow-900 bg-green-100 p-2 font-semibold "
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

export default ConsultProductAdmin;
