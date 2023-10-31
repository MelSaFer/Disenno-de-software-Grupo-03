"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import sendPasswordReset from "../../firebase/auth/forgotpassword";
import { useRouter } from "next/navigation";

function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const { result, error } = await sendPasswordReset(email);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    // Sign in successful
    console.log(result);

    // Redirect to the admin page
    // Typically you would want to redirect them to a protected page an add a check to see if they are admin or
    // create a new page for admin
    router.push("/signin");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96">
        <form
          onSubmit={handleForm}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-3xl font-bold mb-3 text-yellow-900">
            Forgot your password?
          </h1>
          <div className="mb-4">
            <p className="text-black mb-3">
              You will be sent an email to recover your account.
            </p>
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

          <div className="flex items-center justify-between mb-3">
            <button
              type="submit"
              className="w-full bg-yellow-900 text-white font-semibold py-2 rounded"
            >
              Send
            </button>
          </div>
          <div className="flex items-center justify-center text-yellow-900">
            <Link href="/signin">Go back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
