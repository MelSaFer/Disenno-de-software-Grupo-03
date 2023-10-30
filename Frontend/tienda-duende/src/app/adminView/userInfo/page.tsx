// @ts-nocheck
"use client";
import Link from "next/link";
import Footer from "../../../components/footer";
import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/src/components/navbarAdmin";
import axios from "axios";
import * as Routes from "../../routes";
import { auth } from "../../../firebase/config";

const UserInfo = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const requestData = { userId: "1" };
  //     try {
  //       const result = await axios.request({
  //         method: "post",
  //         url: Routes.getUserInfo,
  //         headers: { "Content-Type": "application/json" },
  //         data: requestData,
  //       });
  //       setNombre(result.data.userId);
  //       console.log(result);
  //     } catch (error) {
  //       console.error("Error al obtener datos:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({ uid: user.uid, email: user.email });
        console.log(`El UID del usuario es ${user.uid} ${user.email}`);
      } else {
        console.log("No hay usuario iniciado sesión");
      }

      const fetchData = async () => {
        const requestData = { userId: user.uid };
        try {
          const result = await axios.request({
            method: "post",
            url: Routes.getUserInfo,
            headers: { "Content-Type": "application/json" },
            data: requestData,
          });
          setEmail(result.data.email);
          console.log(result);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    }, []);

    return () => unsubscribe();
  }, []);
  // console.log(authUser);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarAdmin />
      </header>
      <main className="flex-grow">
        <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
        <div className="flex flex-col items-center justify-center text-yellow-900 mb-10">
          <h1 className="font-bold text-2xl">Correo electrónico:</h1>
          <p>{email}</p>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserInfo;
