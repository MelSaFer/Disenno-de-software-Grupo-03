'use client'
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page(): JSX.Element {
  // Access the user object from the authentication context
  // const { user } = useAuthContext();
  const { user, logOut} = useAuthContext() as { user: any; logOut: () => Promise<void>;  }; // Use 'as' to assert the type as { user: any }
  const router = useRouter();

  useEffect( () => {
    // Redirect to the home page if the user is not logged in
    if ( user == null ) {
      router.push( "/" );
    }
    // }, [ user ] );
  }, [ user, router ] ); // Include 'router' in the dependency array to resolve eslint warning

  const handleLogout = async () => {
    try {
      await logOut(); // Llama a la función para cerrar la sesión
      router.push("/"); // Redirige al usuario a la página de inicio después del cierre de sesión
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Only logged-in users can view this page</h1>
      <button
        onClick={() => {
          logOut();
          router.push('/');
      }}
      className="rounded-md bg-green-600 px-10 py-3 text-white shadow-sm hover:bg-green-700"
  >
      Logout
      </button>
    </div>
  );
}

export default Page;