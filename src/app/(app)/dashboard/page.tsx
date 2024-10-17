'use client';

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// import { FaPlusCircle } from 'react-icons/fa';

export default function Dashboard() {
  const { data: session , status} = useSession();
  // console.log(session)
  {status === "unauthenticated" && redirect("/")}
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500"
          onClick={() => signOut()}
          
        >
          Logout
        </button>
       
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add Plot Card */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700">Add New Plot</h2>
            {/* <FaPlusCircle className="text-green-500 text-3xl" /> */}
          </div>
          <p className="text-gray-600 mb-4">
            Create a new plot to track your expenses.
          </p>
          <a
            href="/add-plote"
            className="bg-green-600 text-white px-4 py-2 rounded-md text-center hover:bg-green-500"
          >
            Add Plot
          </a>
        </div>

        {/* Example Future Section */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Plot Overview</h2>
          <p className="text-gray-600 mb-4">
            View your existing plots and track your expenses.
          </p>
          <a
            href="/get-plot"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-500"
          >
            View Plots
          </a>
        </div>

        {/* Placeholder for other sections */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Expenses Summary</h2>
          <p className="text-gray-600 mb-4">
            Get a quick summary of your overall expenses.
          </p>
          <a
            href="#expenses"
            className="bg-yellow-600 text-white px-4 py-2 rounded-md text-center hover:bg-yellow-500"
          >
            View Summary
          </a>
        </div>
      </div>
    </div>
  );
}
