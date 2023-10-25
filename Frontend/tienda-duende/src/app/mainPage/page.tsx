"use client";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../../../public/images/ProfilePic.png";
import Navbar2 from "@/src/components/navbar2";
import Footer from "@/src/components/footer";

function Page(): JSX.Element {
  const { user, logOut } = useAuthContext() as {
    user: any;
    logOut: () => Promise<void>;
  };
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

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
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar2 />
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
