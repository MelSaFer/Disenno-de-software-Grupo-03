// @ts-nocheck
"use client";
import signUp from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { auth } from "../../firebase/config";
import * as Routes from "../routes";

function Page(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [authUser, setAuthUser] = useState({ uid: "", email: "" });

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setAuthUser({ uid: user.uid, email: user.email });
  //       console.log(`El UID del usuario es ${user.uid} ${user.email}`);
  //     } else {
  //       console.log("No hay usuario iniciado sesión");
  //     }
  //   }, []);

  //   // Detener la suscripción cuando el componente se desmonta
  //   return () => unsubscribe();
  // }, []);

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign up with provided email and password
    const { result, error } = await signUp(email, password);

    if (error) {
      // Display and log any sign-up errors
      console.log(error);
      return;
    }

    // Sign up successful
    console.log(result);
    // console.log(result?.user.reloadUserInfo.localId);
    if (email && password) {
      const datos = {
        userId: result?.user.reloadUserInfo.localId,
        email: email,
        roleType: "NORMAL_USER",
        cart: [],
      };

      console.log("Estos son los datos:", datos);

      const fetchData = async () => {
        try {
          const result = await axios.request({
            method: "post",
            url: Routes.addUser,
            headers: { "Content-Type": "application/json" },
            data: datos,
          });
          console.log(result);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    }

    // Redirect to the admin page
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen text-black">
      <div className="w-96 bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6 text-yellow-900">
          Registration
        </h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-900 text-white font-semibold py-2 rounded"
          >
            Sign up
          </button>
          <div className="flex items-center justify-center text-yellow-900">
            <Link href="/">Go back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
