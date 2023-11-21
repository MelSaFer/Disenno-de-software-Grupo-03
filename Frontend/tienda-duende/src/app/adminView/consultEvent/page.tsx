// @ts-nocheck
"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Footer from "@/src/components/footer";
import axios from "axios";
import NavbarAdmin from "@/src/components/navbarAdmin";
import * as Routes from "../../routes";
import Modal from "../../../components/modal"; // overlay
import { BiMessageAdd } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";

const ConsultEvent = () => {
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const router = useRouter();

  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <header>
          <NavbarAdmin />
          <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
        </header>
        <main className="flex-grow">
          <div className="flex h-full justify-center items-top">
            <div className="border border-red-400 rounded-lg">asffasdf</div>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-2 flex flex-col justify-center items-center">
          <Link href={`/adminView/modifyContent/`}>
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
              //   onClick={handleDelete}
            >
              Si
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ConsultEvent;
