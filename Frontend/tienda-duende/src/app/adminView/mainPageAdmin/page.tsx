// @ts-nocheck
"use client";
import { useAuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../../../../public/images/ProfilePic.png";
import NavbarAdmin from "@/src/components/navbarAdmin";
import Footer from "@/src/components/footer";
import { auth } from "../../../firebase/config";
import axios from "axios";
import * as Routes from "../../routes";

function Page(): JSX.Element {
  const { user, logOut } = useAuthContext() as {
    user: any;
    logOut: () => Promise<void>;
  };
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else {
      setUserEmail(user.email);
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
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
        try {
          const result = await axios.request({
            method: "post",
            url: Routes.getUserInfo,
            headers: { "Content-Type": "application/json" },
            data: { userId: user.uid },
          });
          setUserInfo(result.data);
          console.log(result);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    }, []);

    // Detener la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarAdmin />
      </header>
      <main className="flex-grow mt-10">
        <div className="grid w-full grid-cols-6 gap-16 ">
          <div className="col-span-3 mx-10 flex text-3xl flex-col items-start justify-start bg-[#D8EABA] p-5">
            <h1 className="text-5xl uppercase text-dark/75 ">Sobre mí</h1>
            <p className="font-small mt-10 pl-10">
              Soy una joven emprendedora de la zona de Concepción de Tres Ríos
              con un talento excepcional para el arte del maquillaje de
              caracterización. Me dedico a brindar servicios profesionales de
              maquillaje, cursos de automaquillaje y más.
            </p>
          </div>

          <div className="mx-600 relative h-max rounded-2x1 border-0 border-solid border-dark bg-light p-8">
            <div className="">
              <Image
                src={profilePic}
                alt="Main"
                className="pw-full h-auto max-h-[70vh] max-w-[70vh] rounded-2x1"
              />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Page;
