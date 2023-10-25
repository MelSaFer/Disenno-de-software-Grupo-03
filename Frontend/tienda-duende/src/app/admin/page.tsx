'use client'
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';
import profilePic from "../../../public/images/ProfilePic.png";
import Navigation from "../../../components/Navbar";

function Page(): JSX.Element {
  const { user, logOut } = useAuthContext() as { user: any; logOut: () => Promise<void> };
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
    setUserEmail(user.email);
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
    <>
      <Navigation />
      <main className="flex flex-col items-center">
        <div className="grid w-full grid-cols-6 gap-16 ">
          <div className="col-span-3 mt-80 mx-32 flex text-4xl flex-col items-start justify-start">
            <h1 className="text-5xl uppercase text-dark/75">Sobre mi</h1>
            <p className="font-medium mt-10">
              Soy una joven emprendedora de la zona de Concepción de Tres Ríos con un talento excepcional para el arte del maquillaje de caracterización. Me dedico a brindar servicios profesionales de maquillaje, cursos de automaquillaje y más.
            </p>
          </div>

          <div className="mx-600 relative h-max rounded-2x1 border-0 border-solid border-dark bg-light p-8">
            <div className="absolute top-0 z-10 w-[102%] h-[103%] rounded-[2rem] mt-60 bg-red justify-end">
              <Image src={profilePic} alt="Main" className="pw-full h-auto max-h-[70vh] max-w-[70vh] rounded-2x1" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Page;