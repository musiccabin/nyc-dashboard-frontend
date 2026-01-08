import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import CustomerView from "./CustomerView";
import BusinessView from "./BusinessView";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">NYC Food Delivery Dashboard</h1>

      <div className="mb-6 flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activePath === "/customer"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => navigate("/customer")}
        >
          I'm a Customer
        </button>

        <button
          className={`px-4 py-2 rounded ${
            activePath === "/business"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => navigate("/business")}
        >
          I'm a Business
        </button>
      </div>

      <Routes>
        <Route path="/customer" element={<CustomerView />} />
        <Route path="/business" element={<BusinessView />} />
        <Route path="*" element={<CustomerView />} />
      </Routes>
    </div>
  );
};

export default App;
