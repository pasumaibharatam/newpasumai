import React from "react";
import "../styles/Admin.css";

export default function Sidebar({ tab, setTab }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">PASUMAI</h2>

      <button className={tab === "dashboard" ? "active" : ""} onClick={() => setTab("dashboard")}>
        📊 Dashboard
      </button>

      <button className={tab === "register" ? "active" : ""} onClick={() => setTab("register")}>
        📝 Register
      </button>

      <button className={tab === "secretaries" ? "active" : ""} onClick={() => setTab("secretaries")}>
        🏛 District Secretaries
      </button>
    </aside>
  );
}
