// @ts-nocheck
import React, { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { MdOutlineNotifications } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { auth } from "../firebase/config";
import * as Routes from "../app/routes";
import Router from "next/router";
import { set } from "firebase/database";

const Navbar2 = () => {
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });
  const [unread, setUnread] = useState(false);

  const { user, logOut } = useAuthContext() as {
    user: any;
    logOut: () => Promise<void>;
  };
  const router = Router;

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

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
            url: Routes.isUnread,
            headers: { "Content-Type": "application/json" },
            // data: requestData,
            data: { userId: "PFNnWVVK3cOSxci6oGkmxDqrc1n1" },
          });
          console.log(result.data);
          setUnread(result.data);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    }, []);
    return () => unsubscribe();
  }, [authUser.uid, unread]);

  return (
    <div className="mb-7">
      <div className="w-full h-10 bg-[#D8EABA] shadow-lg lg:flex-wrap lg:justify-start lg:py-4"></div>
      <nav
        className="relative flex w-full flex-nowrap items-center justify-betweenpy-2 text-black  lg:flex-wrap lg:justify-start lg:py-4"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className=" flex-grow basis-[100%] items-center justify-center lg:mt-0 lg:!flex lg:basis-auto">
            {/* <!-- Left links --> */}
            <ul className="list-style-none flex flex-col pl-0 lg:mt-1 lg:flex-row">
              {/* <!-- Cart link --> */}
              <li className="">
                <a href="/userView/cart" title="carrito de compra">
                  <FiShoppingCart className="text-3xl mx-5" />
                </a>
              </li>
              {/* <!-- UserInfo link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a
                  className=""
                  href="/userView/userInfo"
                  title="información de usuario"
                >
                  <AiOutlineUser className="text-3xl mr-5" />
                </a>
              </li>
              {/* <!-- History link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a
                  className=""
                  href="/userView/history"
                  title="historial de pedidos"
                >
                  <GoHistory className="text-3xl mr-5" />
                </a>
              </li>
              {/* <!-- Notifications link --> */}

              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a
                  className=""
                  href="/userView/notificationCenter"
                  title="centro de notificaciones"
                >
                  {unread ? (
                    <MdOutlineNotificationsActive className="text-3xl" />
                  ) : (
                    <MdOutlineNotifications className="text-3xl" />
                  )}
                </a>
              </li>

              <li>
                <a
                  className="text-3xl font-bold text-yellow-900 px-20"
                  href="/userView/mainPage"
                  title="Ir a la página de inicio"
                >
                  TIENDA DUENDE
                </a>
              </li>
              {/* <!-- Store link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a className="" href="/userView/store" title="tienda">
                  <FaStore className="text-3xl mx-5" />
                </a>
              </li>
              {/* <!-- Gallery link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a className="" href="/userView/gallery" title="galería">
                  <GrGallery className="text-3xl mr-5" />
                </a>
              </li>
              {/* <!-- Exit link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a
                  className=""
                  href="/signin"
                  title="cerrar sesión"
                  onClick={handleLogout}
                >
                  <IoExitOutline className="text-3xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar2;
