import React from "react";
import { FaStore } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { TbNotebook } from "react-icons/tb";
import { GrGallery } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { BiMessageDetail } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";
import { MdOutlineNotifications } from "react-icons/md";
import Router from "next/router";

const Navbar2 = () => {
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
              {/* <!-- UserInfo link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a
                  className=""
                  href="/adminView/userInfo"
                  title="información de usuario"
                >
                  <AiOutlineUser className="text-3xl mr-5" />
                </a>
              </li>
              {/* <!-- Calendar link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a className="" href="/adminView/calendar" title="agenda">
                  <TbNotebook className="text-3xl mr-5" />
                </a>
              </li>
              {/* <!-- History link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a
                  className=""
                  href="/adminView/historyAdmin"
                  title="historial de pedidos"
                >
                  <GoHistory className="text-3xl mr-5" />
                </a>
              </li>

              <li>
                <a
                  className="text-3xl font-bold text-yellow-900 px-20"
                  href="/adminView/mainPageAdmin"
                  title="Ir a la página de inicio"
                >
                  TIENDA DUENDE
                </a>
              </li>
              {/* <!-- Notifications link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a
                  className=""
                  href="/adminView/notificationCenterAdmin"
                  title="centro de notificaciones"
                >
                  <MdOutlineNotifications className="text-3xl" />
                </a>
              </li>
              {/* <!-- Store link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a className="" href="/adminView/storeAdmin" title="tienda">
                  <FaStore className="text-3xl mx-5" />
                </a>
              </li>
              {/* <!-- Gallery link --> */}
              <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                <a className="" href="/adminView/galleryAdmin" title="galería">
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
