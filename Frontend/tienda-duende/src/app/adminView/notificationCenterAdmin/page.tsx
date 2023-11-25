// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../../firebase/config";
// components
import Footer from "@/src/components/footer";
import NavbarAdmin from "@/src/components/navbarAdmin";
import * as Routes from "../../routes";

const NotificationCenterAdmin = () => {
  // constants and variables
  const [notifications, setNotifications] = useState([]);
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({ uid: user.uid, email: user.email });
        console.log(`El UID del usuario es ${user.uid} ${user.email}`);
      } else {
        console.log("No hay usuario iniciado sesión");
      }

      // request to get the notifications of the user
      const fetchData = async () => {
        const requestData = { userId: authUser.uid };
        try {
          const result = await axios.request({
            method: "post",
            url: Routes.getNotifications,
            headers: { "Content-Type": "application/json" },
            data: requestData,
          });
          setNotifications(result.data.reverse());
          console.log(result.data);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
        // request to update the state of the notifications of the user
        try {
          const result = await axios.request({
            method: "put",
            url: Routes.updateNotificationState,
            headers: { "Content-Type": "application/json" },
            data: requestData,
          });
          console.log(result.data);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    }, []);

    return () => unsubscribe();
  }, [authUser.uid]);

  // function that returns a formatted date and time in string format
  const formatearFechaHora = (cadenaTiempo) => {
    const fecha = new Date(cadenaTiempo);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Nota: los meses comienzan desde 0
    const año = fecha.getFullYear();

    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();

    // Agrega ceros a la izquierda si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const añoFormateado = año;
    const horaFormateada = hora < 10 ? `0${hora}` : hora;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

    return `${diaFormateado}/${mesFormateado}/${añoFormateado} ${horaFormateada}:${minutosFormateados}`;
  };

  // function that returns a formatted date in string format
  const formatearFecha = (cadenaTiempo) => {
    const fecha = new Date(cadenaTiempo);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Nota: los meses comienzan desde 0
    const año = fecha.getFullYear();

    // Agrega ceros a la izquierda si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const añoFormateado = año;

    return `${diaFormateado}/${mesFormateado}/${añoFormateado}`;
  };

  // function that returns the border color of the notification depending on its state
  const getBorderColor = (notificationState) => {
    switch (notificationState) {
      case true:
        return "border-2 rounded-sm border-gray-2";
      case false:
        return "border-2 border-l-8 rounded-sm border-red-300 ";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarAdmin />
      </header>
      <main className="flex-grow justify-center items-center">
        <hr className="border border-red-400 w-5/6 mx-auto my-4 mb-10"></hr>
        <div className="flex flex-col justify-center items-center">
          {notifications.map((item) => (
            <div
              key={item.notificationId}
              className={`flex-1 ${getBorderColor(
                item.state
              )} w-[40%] p-3 pl-7 hover:bg-gray-100`}
            >
              <p className="font-light text-red-600 justify-end items-center">
                {formatearFechaHora(item.notificationTime)}
              </p>
              {item.notificationType === "DELIVERY" ? (
                <b>Entrega pendiente</b>
              ) : item.notificationType === "MAKEUP" ? (
                <b>Makeup agendado</b>
              ) : (
                <b>Makeup agendado</b>
              )}

              <p className="text-gray-400">
                Número de pedido: {item.purchaseId}
              </p>

              {item.notificationType === "DELIVERY" ? (
                <p className="text-gray-400">
                  Fecha de entrega aproximada:{" "}
                  {formatearFecha(item.deliveryDate)}
                </p>
              ) : (
                <p className="text-gray-400">Info de makeup</p>
              )}
            </div>
          ))}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default NotificationCenterAdmin;
