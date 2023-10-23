// @ts-nocheck
import { useEffect, useRef } from "react";
import { BsFillHandbagFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import Link from "next/link";

import "./navbar.css";

const Navbar = () => {
  const navbar = useRef();

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.current.classList.add("navbar-hidden");
    } else {
      navbar.current.classList.remove("navbar-hidden");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="navbar-container bg-red-200 mb-10">
      <nav
        ref={navbar}
        className="fixed w-full h-24 shadow-x1 px-8 pt-8 grid grid-rows-2"
      >
        <div className="flex justify-between items-center h-full px-4">
          <div className="flex items-center">
            <Link href="/carrito">
              <BsFillHandbagFill className="text-5xl" />
            </Link>
            <Link href="/userInfo">
              <AiOutlineUser className="text-5xl ml-2" />
            </Link>
          </div>

          <div className="text-5xl text-black">DUENDE MAQUILLISTA</div>

          <div className="ml-auto">
            <Link href="/signin">
              <CgClose className="text-5xl" />
            </Link>
          </div>
        </div>

        <div className="flex grid-rows-2 justify-between items-center px-8 h-full pt-8 text-4xl">
          <Link href="/tienda" className="text-black">
            Tienda
          </Link>
          <Link href="/galeria" className="text-black">
            Galería
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
