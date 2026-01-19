import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import DistrictSecretaries from "../pages/DistrictSecretaries";
import "../styles/Admin.css";

export default function AdminLayout() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="admin-layout">
      <Sidebar tab={tab} setTab={setTab} />

      <main className="admin-content">
        {tab === "dashboard" && <Dashboard />}
        {tab === "register" && <Register />}
        {tab === "secretaries" && <DistrictSecretaries />}
      </main>
    </div>
  );
}
