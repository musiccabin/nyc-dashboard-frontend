import React from "react"
import { useNavigate } from "react-router-dom"

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-14">
      <h1 className="text-5xl font-bold leading-snug sm:leading-snug md:leading-tight">NYC Food Delivery Dashboard</h1>
      <div className="space-y-4, space-x-16">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/customer")}
        >
          I'm a Customer
        </button>

        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={() => navigate("/business")}
        >
          I'm a Business
        </button>
      </div>
    </div>
  );
};

export default LandingPage
