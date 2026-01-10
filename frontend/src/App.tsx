import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import CustomerView from "./CustomerView";
import BusinessView from "./BusinessView";

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
