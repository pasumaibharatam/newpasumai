import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

/* ---------- DISTRICTS ---------- */
const districts = [
  "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore",
  "Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram",
  "Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam",
  "Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram",
  "Ranipet","Salem","Sivagangai","Tenkasi","Thanjavur","Theni",
  "Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupathur",
  "Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur",
  "Vellore","Viluppuram","Virudhunagar"
];

/* ---------- DISTRICT SELECT ---------- */
function DistrictSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} required>
      <option value="">தேர்வு</option>
      {districts.map((d) => (
        <option key={d} value={d}>{d}</option>
      ))}
    </select>
  );
}

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    father_name: "",
    gender: "",
    dob: "",
    age: "",
    blood_group: "",
    mobile: "",
    email: "",
    state: "Tamil Nadu",
    district: "",
    local_body: "",
    nagaram_type: "",
    constituency: "",
    ward: "",
    address: "",
    voter_id: "",
    aadhaar: "",
    photo: null,
  });

  /* ---------- INPUT CHANGE ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (district) => {
    setForm(prev => ({ ...prev, district }));
  };

  const handlePhotoChange = (e) => {
    setForm(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("candidates")) || [];

    // 🚫 DUPLICATE CHECK (Mobile)
    const exists = stored.some(c => c.mobile === form.mobile);
    if (exists) {
      alert("இந்த மொபைல் எண் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது!");
      return;
    }

    const newCandidate = {
      ...form,
      id: Date.now(), // UNIQUE
    };

    const updated = [...stored, newCandidate];
    localStorage.setItem("candidates", JSON.stringify(updated));

    // RESET FORM
    setForm({
      name: "",
      father_name: "",
      gender: "",
      dob: "",
      age: "",
      blood_group: "",
      mobile: "",
      email: "",
      state: "Tamil Nadu",
      district: "",
      local_body: "",
      nagaram_type: "",
      constituency: "",
      ward: "",
      address: "",
      voter_id: "",
      aadhaar: "",
      photo: null,
    });

    navigate("/dashboard");
  };

  return (
    <div className="register-container">
      <h2>உறுப்பினர் பதிவு படிவம்</h2>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>முழு பெயர்</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>தந்தை / கணவர் பெயர்</label>
          <input name="father_name" value={form.father_name} onChange={handleChange} />
        </div>

        <div className="form-row two-col">
          <div>
            <label>பாலினம்</label>
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">தேர்வு</option>
              <option value="Male">ஆண்</option>
              <option value="Female">பெண்</option>
              <option value="Other">மற்றவை</option>
            </select>
          </div>

          <div>
            <label>பிறந்த தேதி</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row two-col">
          <input type="number" min="18" name="age"
            placeholder="வயது"
            value={form.age} onChange={handleChange} required />

          <select name="blood_group" value={form.blood_group} onChange={handleChange} required>
            <option value="">இரத்த வகை</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>
        </div>

        <div className="form-row two-col">
          <input placeholder="மொபைல் எண்" name="mobile"
            value={form.mobile} onChange={handleChange} required />
          <input placeholder="மின்னஞ்சல்" name="email"
            value={form.email} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input value="Tamil Nadu" readOnly />
        </div>

        <div className="form-row">
          <DistrictSelect value={form.district} onChange={handleDistrictChange} />
        </div>

        <div className="form-row">
          <select name="local_body" value={form.local_body} onChange={handleChange} required>
            <option value="">உள்ளாட்சி வகை</option>
            <option value="Ooratchi">ஊராட்சி</option>
            <option value="Peruratchi">பேரூராட்சி</option>
            <option value="Managaratchi">மாநகராட்சி</option>
          </select>
        </div>

        <div className="form-row">
          <select name="nagaram_type" value={form.nagaram_type} onChange={handleChange} required>
            <option value="">நகரம் / ஒன்றியம் / பகுதி</option>
            <option value="Nagaram">நகரம்</option>
            <option value="Ondriyam">ஒன்றியம்</option>
            <option value="Paguthi">பகுதி</option>
          </select>
        </div>

        <div className="form-row two-col">
          <input placeholder="தொகுதி" name="constituency"
            value={form.constituency} onChange={handleChange} />
          <input placeholder="வார்டு" name="ward"
            value={form.ward} onChange={handleChange} />
        </div>

        <div className="form-row">
          <textarea placeholder="முகவரி" rows="3"
            name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="form-row two-col">
          <input placeholder="வாக்காளர் எண்"
            name="voter_id" value={form.voter_id} onChange={handleChange} />
          <input placeholder="ஆதார் எண்"
            name="aadhaar" value={form.aadhaar} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

        <button type="submit">பதிவு செய்யவும்</button>
      </form>
    </div>
  );
}
  