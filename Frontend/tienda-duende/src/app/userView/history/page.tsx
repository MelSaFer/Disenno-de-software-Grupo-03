// @ts-nocheck
"use client";
import React, { Fragment, useState, useEffect } from "react";
import Footer from "../../../components/footer";
import axios from "axios";
import Navbar2 from "@/src/components/navbar2";
import * as Routes from "../../routes";
import { auth } from "../../../firebase/config";
import { set } from "firebase/database";
import Modal from "../../../components/modal"; // overlay
import { BiMessageAdd } from "react-icons/bi";

const baseURL = "https://mocki.io/v1/2f52d417-4d0d-4ed4-8c97-97131eb8ceb6";

const History = () => {
  const [history, setHistory] = useState([]);
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({ uid: user.uid, email: user.email });
        console.log(`El UID del usuario es ${user.uid} ${user.email}`);
      } else {
        console.log("No hay usuario iniciado sesión");
      }

      const fetchData = async () => {
        // const requestData = { userId: user.uid };
        const requestData = { userId: authUser.uid };
        try {
          const result = await axios.request({
            method: "post",
            url: Routes.getHistory,
            headers: { "Content-Type": "application/json" },
            data: requestData,
          });
          setHistory(result.data);
          console.log(result);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    }, []);

    return () => unsubscribe();
  }, [authUser.uid]);

  console.log(history);
  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbar2 />
        </header>
        <main className="flex-grow ml-12 mr-12">
          {history.map((item) => (
            <div key={item._id} className="text-yellow-900">
              <hr className="border border-red-400 w-6/6 mx-auto my-4"></hr>
              <h1 className="text-2xl text-red-400 mb-2">
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
                  <b>Voucher:</b>
                </h2>
                {/* <button
                  className="text-white border bg-red-500 border-red-500 rounded-lg py-2 px-5 hover:bg-red-400"
                  onClick={() => setShowModal(true)}
                >
                  Voucher
                </button> */}
                <div className="w-[200px] ml-24">
                  <img src={item.voucherId}></img>
                </div>

                {/* <Modal
                  isVisible={showModal}
                  onClose={() => setShowModal(false)}
                >
                  <div className="p-6 w-[700px] flex justify-center items-center">
                    <img src={item.voucherId}></img>
                  </div>
                </Modal> */}
              </div>
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

export default History;
