// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";

// export default function DistrictSecretaries() {
//   const [list, setList] = useState(
//     () => JSON.parse(localStorage.getItem("secretaries")) || []
//   );
//   const [form, setForm] = useState({ name: "", district: "" });
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     localStorage.setItem("secretaries", JSON.stringify(list));
//   }, [list]);

//   const handleSubmit = () => {
//     if (!form.name || !form.district) return;

//     if (editId) {
//       setList(list.map(s => (s.id === editId ? { ...s, ...form } : s)));
//       setEditId(null);
//     } else {
//       setList([...list, { ...form, id: Date.now() }]);
//     }

//     setForm({ name: "", district: "" });
//   };

//   return (
//     <div className="dashboard">
//       <h2>District Secretaries</h2>

//       <div className="filters">
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           placeholder="District"
//           value={form.district}
//           onChange={e => setForm({ ...form, district: e.target.value })}
//         />
//         <button onClick={handleSubmit}>
//           {editId ? "Update" : "Add"}
//         </button>
//       </div>

//       <div className="cards">
//         {list.map(s => (
//           <div key={s.id} className="card">
//             <h4>{s.name}</h4>
//             <p>{s.district}</p>

//             <button onClick={() => { setForm(s); setEditId(s.id); }}>
//               Edit
//             </button>
//             <button onClick={() => setList(list.filter(x => x.id !== s.id))}>
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
