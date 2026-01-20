import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Corrected imports (no './src/')
import Navbar from "./components/Navbar";

import Register from "./pages/Register";
import DownloadID from "./pages/DownloadID";
import Home from "./components/Home";
import Dashboard  from "./pages/Dashboard";
import Footer from "./components/Footer";
import DmkOrganization from "./pages/DmkOrganization";
// import DistrictSecretaries from "./pages/DistrictSecretaries";
// import Members from "./pages/Members";

function App() {
  const [language, setLanguage] = useState("en");

  return (
    <Router>
      <Navbar setLanguage={setLanguage} language={language} />

      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/register" element={<Register language={language} />} />
        <Route path="/downloadid" element={<DownloadID language={language} />} />
         <Route path="/dashboard" element={<Dashboard language={language} />} />
        {/* <Route path="/district-secretaries" element={<DistrictSecretaries />} /> */}
        {/*<Route path="/members" element={<Members language={language} />} /> */}
        <Route
          path="/organizationals"
          element={<DmkOrganization />}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
