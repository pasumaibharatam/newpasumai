import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("candidates");

  /* ================= CANDIDATES ================= */
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({ name: "", district: "", mobile: "" });
  const [counts, setCounts] = useState({ total: 0, male: 0, female: 0 });

  /* ================= MEMBERS ================= */
  const [members, setMembers] = useState(() =>
    JSON.parse(localStorage.getItem("members")) || []
  );
  const [form, setForm] = useState({ name: "", district: "" });
  const [editId, setEditId] = useState(null);

  /* ---------- LOAD CANDIDATES ---------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("candidates")) || [];
    setCandidates(stored);
  }, []);

  /* ---------- SAVE MEMBERS ---------- */
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  /* ---------- COUNTS ---------- */
  const total = candidates.length;
  const male = candidates.filter(c => c.gender === "Male").length;
  const female = candidates.filter(c => c.gender === "Female").length;
  const membersCount = members.length;
  useEffect(() => {
    let t = 0, m = 0, f = 0;
    const interval = setInterval(() => {
      if (t < total) t++;
      if (m < male) m++;
      if (f < female) f++;
      setCounts({ total: t, male: m, female: f });
      if (t === total && m === male && f === female) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [total, male, female]);

  /* ---------- FILTER ---------- */
  const filtered = candidates.filter(c =>
    c.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
    c.district?.toLowerCase().includes(filters.district.toLowerCase()) &&
    c.mobile?.includes(filters.mobile)
  );

  const highlight = (text = "", value) =>
    value
      ? text.replace(new RegExp(`(${value})`, "gi"), "<mark>$1</mark>")
      : text;

  /* ---------- CHART DATA ---------- */
  const pieData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [male, female],
        backgroundColor: ["#f59e0b", "#1f7a1f"],
      },
    ],
  };

  const ageGroups = { "18–25": 0, "26–35": 0, "36–45": 0, "46+": 0 };
  candidates.forEach(c => {
    if (c.age <= 25) ageGroups["18–25"]++;
    else if (c.age <= 35) ageGroups["26–35"]++;
    else if (c.age <= 45) ageGroups["36–45"]++;
    else ageGroups["46+"]++;
  });

  const barData = {
    labels: Object.keys(ageGroups),
    datasets: [
      { data: Object.values(ageGroups), backgroundColor: "#1f7a1f" },
    ],
  };

  const districtCounts = {};
  candidates.forEach(c => {
    districtCounts[c.district] = (districtCounts[c.district] || 0) + 1;
  });

  const districtData = {
    labels: Object.keys(districtCounts),
    datasets: [
      { data: Object.values(districtCounts), backgroundColor: "#f59e0b" },
    ],
  };

  /* ================= MEMBER ACTIONS ================= */
  const submitMember = () => {
    if (!form.name || !form.district) return;

    if (editId) {
      setMembers(members.map(m =>
        m.id === editId ? { ...m, ...form } : m
      ));
      setEditId(null);
    } else {
      setMembers([...members, { ...form, id: Date.now() }]);
    }

    setForm({ name: "", district: "" });
  };

  const editMember = (m) => {
    setForm({ name: m.name, district: m.district });
    setEditId(m.id);
  };

  const deleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  /* ================= UI ================= */
  return (
    <div className={`dashboard ${dark ? "dark" : ""}`}>
      <header className="top-bar">
        <h2>Admin Dashboard</h2>
        <button className="dark-toggle" onClick={() => setDark(!dark)}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* ---------- TABS ---------- */}
      <div className="toggle">
        <button
          className={tab === "candidates" ? "active" : ""}
          onClick={() => setTab("candidates")}
        >
          Candidates
        </button>
        <button
          className={tab === "members" ? "active" : ""}
          onClick={() => setTab("members")}
        >
          Members
        </button>
      </div>

      {/* ================= CANDIDATES TAB ================= */}
      {tab === "candidates" && (
        <>
          <div className="stats">
            <div className="stat total">Total<br /><span>{counts.total}</span></div>
            <div className="stat male">Male<br /><span>{counts.male}</span></div>
            <div className="stat female">Female<br /><span>{counts.female}</span></div>
            <div className="stat members">Members<br /><span>{membersCount}</span></div>
          </div>

          <div className="charts">
            <div className="chart-card"><Pie data={pieData} /></div>
            <div className="chart-card"><Bar data={barData} /></div>
            <div className="chart-card"><Bar data={districtData} /></div>
          </div>

          <div className="filters">
            <input placeholder="Search Name"
              onChange={e => setFilters({ ...filters, name: e.target.value })} />
            <input placeholder="District"
              onChange={e => setFilters({ ...filters, district: e.target.value })} />
            <input placeholder="Mobile"
              onChange={e => setFilters({ ...filters, mobile: e.target.value })} />
          </div>

          <div className="cards">
            {filtered.map((c, i) => (
              <div key={i} className="card">
                <h4 dangerouslySetInnerHTML={{
                  __html: highlight(c.name, filters.name)
                }} />
                <p>Gender: {c.gender}</p>
                <p>Age: {c.age}</p>
                <p>{c.district}</p>
                <p>{c.mobile}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= MEMBERS TAB ================= */}
      {tab === "members" && (
        <>
          <div className="filters">
            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="District"
              value={form.district}
              onChange={e => setForm({ ...form, district: e.target.value })}
            />
            <button onClick={submitMember}>
              {editId ? "Update" : "Add"}
            </button>
          </div>

          <div className="cards">
            {members.map(m => (
              <div key={m.id} className="card">
                <h4>{m.name}</h4>
                <p>{m.district}</p>
                <button onClick={() => editMember(m)}>Edit</button>
                <button onClick={() => deleteMember(m.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
