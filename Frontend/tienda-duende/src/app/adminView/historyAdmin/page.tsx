// @ts-nocheck
"use client";
import React from "react";
import Navbar2 from "@/src/components/navbar2";
import Footer from "../../../components/footer";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { BiMessageAdd } from "react-icons/bi";
import Modal from "../../../components/modal";
import * as Routes from "../../routes";

const baseURL = "https://mocki.io/v1/c1e66925-19a3-4338-a5a2-3ac53d8e5e04";

const HistoryAdmin = () => {
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = { userId: 1 };
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
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbar2 />
        </header>
        <main className="flex-grow ml-12 mr-12">
          {history.map((item) => (
            <div key={item.purchaseId} className="text-yellow-900">
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
                          {product.productId} [x{product.quantity}]
                        </li>
                      ))}
                    </ul>
                    <h2 className="mb-3">
                      <b>Total:</b> {item.shippingPrice}
                    </h2>
                    <h2 className="mb-3">
                      <b>Direccion:</b> {item.shippingAdress}
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
                        src={item.imagen_comprobante_url}
                        alt="comprobante de compra"
                        className="w-[400px] h-auto"
                      />
                    </div>
                  </Modal>
                </div>
                <div className="w-1/2 text-right pr-10">
                  <h1 className="text-red-400 font-semibold text-2xl pb-10">
                    Estado: {item.state}
                  </h1>
                  <div className="flex flex-col justify-center items-end">
                    <button className="bg-red-500 text-white p-2 border rounded-full w-[200px] mb-2 hover:bg-red-400">
                      Cancelar compra
                    </button>
                    <button className="bg-red-500 text-white p-2 border rounded-full w-[200px] hover:bg-red-400">
                      Aprobar compra
                    </button>
                  </div>
                </div>
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
