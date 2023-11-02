// @ts-nocheck
"use client";
import React from "react";
import NavbarAdmin from "@/src/components/navbarAdmin";
import Footer from "../../../components/footer";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { BiMessageAdd } from "react-icons/bi";
import Modal from "../../../components/modal";
import { auth } from "../../../firebase/config";
import * as Routes from "../../routes";

const baseURL = "https://mocki.io/v1/c1e66925-19a3-4338-a5a2-3ac53d8e5e04";

const HistoryAdmin = () => {
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [authUser, setAuthUser] = useState({ uid: "", email: "" });
  const [modified, setModified] = useState(false);

  // obtains the user's uid and email
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({ uid: user.uid, email: user.email });
        console.log(`El UID del usuario es ${user.uid} ${user.email}`);
      } else {
        console.log("No hay usuario iniciado sesión");
      }
    }, []);

    // Detener la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { userId: authUser.uid };
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getHistory,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });
        const sorted = result.data.sort((a, b) => {
          return b.purchaseId - a.purchaseId;
        });
        setHistory(sorted);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [authUser.uid, modified]);
  console.log(history);

  const handleStatusChange = async (item, newStatus) => {
    const requestData = {
      purchaseId: item._id,
      userId: item.userId,
      state: newStatus,
    };
    console.log(requestData);
    try {
      const result = await axios.request({
        method: "put",
        url: Routes.updatePurchaseState,
        headers: { "Content-Type": "application/json" },
        data: requestData,
      });
      console.log(result);
      console.log("Pedido aprobado");
      setModified(!modified);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <header>
          <NavbarAdmin />
        </header>
        <main className="flex-grow ml-12 mr-12">
          {history.map((item) => (
            <div key={item._id} className="text-yellow-900">
              <hr className="border border-red-400 w-6/6 mx-auto my-4"></hr>
              {/* --------------------------------------------------------------------------- */}
              <div className="flex">
                <div className="w-1/2 text-left">
                  <h1 className="text-2xl font-semibold text-red-400 mb-2">
                    Compra {item.purchaseId}
                  </h1>
                  <div className="pl-8">
                    <h2 className="font-bold">Productos:</h2>
                    <ul className="list-disc ml-8 mb-4">
                      {item.products.map((product) => (
                        <li key={product.productId}>
                          {product.productName} <b>[x{product.quantity}]</b>
                        </li>
                      ))}
                    </ul>
                    <h2 className="mb-3">
                      <b>Total:</b> ${item.shippingPrice}
                    </h2>
                    <h2 className="mb-3">
                      <b>Direccion:</b> {item.shippingAddress}
                    </h2>
                    <h2 className="mb-3">
                      <b>Fecha:</b> {item.aproxDeliveryDate}
                    </h2>
                    <h2 className="mb-3">
                      <b>Cliente:</b> {item.userId}
                    </h2>
                    <button
                      className="bg-red-500 text-white p-2 border rounded-full hover:bg-red-400"
                      onClick={() => setShowModal(true)}
                    >
                      Ver comprobante de pago
                    </button>
                  </div>
                  <Modal
                    isVisible={showModal}
                    onClose={() => setShowModal(false)}
                  >
                    <div className="p-6 flex justify-center items-center">
                      <img
                        src={item.voucherId}
                        alt="comprobante de compra"
                        className="w-[400px] h-auto"
                      />
                    </div>
                  </Modal>
                </div>
                {/* Depending on the item state the user can modify the state */}
                {/* PENDING CASE */}
                {item.state === "PENDING" ? (
                  <div className="w-1/2 text-right pr-10">
                    <h1 className="text-red-400 font-semibold text-2xl pb-10">
                      Estado: {item.state}
                    </h1>

                    <div className="flex flex-col justify-center items-end">
                      <button
                        className="bg-red-500 text-white p-2 border rounded-full w-[200px] mb-2 hover:bg-red-400"
                        onClick={() => handleStatusChange(item, "APPROVED")}
                      >
                        Aprobar pedido
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 border rounded-full w-[200px] hover:bg-red-400"
                        onClick={() => handleStatusChange(item, "REJECTED")}
                      >
                        Cancelar pedido
                      </button>
                    </div>
                  </div>
                ) : null}
                {/* APPROVED CASE */}
                {item.state === "APPROVED" ? (
                  <div className="w-1/2 text-right pr-10">
                    <h1 className="text-red-400 font-semibold text-2xl pb-10">
                      Estado: {item.state}
                    </h1>

                    <div className="flex flex-col justify-center items-end">
                      <button
                        className="bg-red-500 text-white p-2 border rounded-full w-[200px] mb-2 hover:bg-red-400"
                        onClick={() => handleStatusChange(item, "SEND")}
                      >
                        Enviar pedido
                      </button>
                    </div>
                  </div>
                ) : null}
                {/* REJECTED CASE */}
                {item.state === "REJECTED" ? (
                  <div className="w-1/2 text-right pr-10">
                    <h1 className="text-red-400 font-semibold text-2xl pb-10">
                      Estado: {item.state}
                    </h1>
                  </div>
                ) : null}
                {/* SEND CASE */}
                {item.state === "SEND" ? (
                  <div className="w-1/2 text-right pr-10">
                    <h1 className="text-red-400 font-semibold text-2xl pb-10">
                      Estado: {item.state}
                    </h1>

                    <div className="flex flex-col justify-center items-end">
                      <button
                        className="bg-red-500 text-white p-2 border rounded-full w-[200px] mb-2 hover:bg-red-400"
                        onClick={() => handleStatusChange(item, "DELIVERED")}
                      >
                        Marcar como entregado
                      </button>
                    </div>
                  </div>
                ) : null}
                {/* DELIVERED CASE */}
                {item.state === "DELIVERED" ? (
                  <div className="w-1/2 text-right pr-10">
                    <h1 className="text-red-400 font-semibold text-2xl pb-10">
                      Estado: {item.state}
                    </h1>
                  </div>
                ) : null}
              </div>
              {/* --------------------------------------------------------------------------- */}
            </div>
          ))}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Fragment>
  );
};

export default HistoryAdmin;
