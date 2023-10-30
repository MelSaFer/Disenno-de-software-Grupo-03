import React from "react";
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const Footer = () => {
  const abrirInstagram = () => {
    // Especifica la URL que deseas abrir en una nueva página
    const url = "https://www.instagram.com/duenderfs/";

    // Abre la URL en una nueva ventana o pestaña
    window.open(url, "_blank");
  };
  const abrirTiktok = () => {
    // Especifica la URL que deseas abrir en una nueva página
    const url = "https://www.instagram.com/duenderfs/";

    // Abre la URL en una nueva ventana o pestaña
    window.open(url, "_blank");
  };
  const abrirFacebook = () => {
    // Especifica la URL que deseas abrir en una nueva página
    const url = "https://www.facebook.com/duenderfs/";

    // Abre la URL en una nueva ventana o pestaña
    window.open(url, "_blank");
  };

  return (
    <footer className="flex flex-col items-center bg-neutral-200 text-center text-white dark:bg-yellow-900 mt-7">
      <div className="container pt-5">
        <div className="mb-5 flex justify-center">
          <a
            href="#!"
            className="mr-9 text-neutral-800 dark:text-neutral-200"
            onClick={abrirInstagram}
          >
            <AiOutlineInstagram className="w-6 h-6" />
          </a>
          <a
            href="#!"
            className="mr-9 text-neutral-800 dark:text-neutral-200"
            onClick={abrirTiktok}
          >
            <FaTiktok className="w-6 h-6" />
          </a>
          <a
            href="#!"
            className="mr-9 text-neutral-800 dark:text-neutral-200"
            onClick={abrirFacebook}
          >
            <AiFillFacebook className="w-6 h-6" />
          </a>
          <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <BsFillTelephoneFill className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
