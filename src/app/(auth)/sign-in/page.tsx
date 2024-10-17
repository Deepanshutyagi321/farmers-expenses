'use client';
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignIn() {
  const { status } = useSession();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-green-100">
      {/* Title Section */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-green-900">Farmers Expenses</h1>
        <p className="text-xl text-gray-700 mt-2">Track your farming expenses with ease</p>
      </div>

      {/* Sign-In Section */}
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">Sign in to Continue</h2>
        <p className="text-lg text-gray-600 text-center mb-8">Access your Farmer Expenses account</p>

        <button
          className="bg-green-700 hover:bg-green-800 text-white text-2xl font-semibold py-3 w-full rounded-lg shadow-md transition duration-300"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>

        {/* Redirect after authentication */}
        {status === "authenticated" && redirect("/dashboard")}
      </div>
    </div>
  );
}
