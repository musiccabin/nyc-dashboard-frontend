import React from "react";
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import CustomerView from "./pages/CustomerView"
import BusinessView from "./pages/BusinessView"

const App: React.FC = () => {
 return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer" element={<CustomerView />} />
        <Route path="/business" element={<BusinessView />} />
      </Routes>
    </div>
  );
};

export default App;
