"use client";
import signIn from "../../firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function Page(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(email, password);

    if (error) {
      // Display and log any sign-in errors
      alert("Error al iniciar sesion");
      console.log(error);
      return;
    }

    // Sign in successful
    console.log(result);

    // Redirect to the admin page
    // Typically you would want to redirect them to a protected page an add a check to see if they are admin or
    // create a new page for admin
    router.push("/userView/mainPage");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 ">
        <form
          onSubmit={handleForm}
          className="bg-white shadow-xl border border-gray-100 rounded px-8 pt-6 pb-8 mb-4 "
        >
          <h1 className="text-3xl font-bold mb-6 text-yellow-900">Sign In</h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-end justify-end text-yellow-900 mb-3">
            <Link href="/forgotPassword">Forgot your password?</Link>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-yellow-900 text-white font-semibold py-2 rounded mb-3"
            >
              Sign In
            </button>
          </div>
          <div className="flex items-end justify-center text-yellow-900 mb-3">
            <Link href="/signup">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
