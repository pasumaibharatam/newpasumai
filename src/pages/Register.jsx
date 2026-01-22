import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
/* ---------- REQUIRED LABEL ---------- */
function RequiredLabel({ text }) {
  return (
    <label>
      {text} <span className="required">*</span>
    </label>
  );
}
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
const [errors, setErrors] = useState({});
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
    password:"",
  });

  /* ---------- INPUT CHANGE ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
     if (name === "aadhaar") {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 12) return;
  }
 if (name === "password") {
    if (value.length > 12) return; // optional limit
  }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (district) => {
    setForm(prev => ({ ...prev, district }));
  };

 const handlePhotoUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setForm({
      ...form,
      photo: reader.result, // ✅ BASE64 STRING
    });
  };
  reader.readAsDataURL(file);
};
const validate = () => {
  const newErrors = {};

  if (!form.name.trim()) newErrors.name = "பெயர் தேவை";
  if (!form.gender) newErrors.gender = "பாலினம் தேர்வு செய்யவும்";
  if (!form.age) newErrors.age = "வயது தேவை";
  if (!form.blood_group) newErrors.blood_group = "இரத்த வகை தேவை";

  if (!form.mobile) {
    newErrors.mobile = "மொபைல் எண் தேவை";
  } else if (form.mobile.length !== 10) {
    newErrors.mobile = "10 இலக்க மொபைல் எண் தேவை";
  }

  if (!form.password) {
    newErrors.password = "பாஸ்வோர்ட் தேவை";
  }

  if (!form.aadhaar) {
    newErrors.aadhaar = "ஆதார் எண் தேவை";
  } else if (form.aadhaar.length !== 12) {
    newErrors.aadhaar = "ஆதார் எண் 12 இலக்கமாக இருக்க வேண்டும்";
  }

  if (!form.district) newErrors.district = "மாவட்டம் தேர்வு செய்யவும்";
  if (!form.local_body) newErrors.local_body = "உள்ளாட்சி வகை தேவை";
  if (!form.nagaram_type) newErrors.nagaram_type = "நகர வகை தேவை";

  return newErrors;
};

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
  e.preventDefault();
const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({}); // clear errors
  const stored = JSON.parse(localStorage.getItem("candidates")) || [];

  // DUPLICATE MOBILE CHECK
  const exists = stored.some(c => c.mobile === form.mobile);
  if (exists) {
    alert("இந்த மொபைல் எண் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது!");
    return;
  }
// if (form.aadhaar.length !== 12) {
//   alert("ஆதார் எண் 12 இலக்கமாக இருக்க வேண்டும்");
//   return;
// }
  // PASSWORD VALIDATION
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(form.password)) {
    alert("பாஸ்வோர்ட் குறைந்தது 6 எழுத்துகள் மற்றும் 1 எண் இருக்க வேண்டும்");
    return;
  }

  // CREATE CANDIDATE
  const newCandidate = {
    ...form,
    id: Date.now(),
    photo: form.photo, // ✅ BASE64 STORED
  };

  const updated = [...stored, newCandidate];
  localStorage.setItem("candidates", JSON.stringify(updated));

  alert("பதிவு வெற்றிகரமாக முடிந்தது!");

  navigate("/dashboard");
};


    
  return (
    <div className="register-container">
      <h2>உறுப்பினர் பதிவு படிவம்</h2>
 <p className="required-note">
        <span className="required">*</span> குறியிடப்பட்ட புலங்கள் கட்டாயம்
      </p>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <RequiredLabel text="பெயர்" />
          <input name="name" value={form.name} onChange={handleChange} required />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <label>தந்தை / கணவர் பெயர்</label>
          <input name="father_name" value={form.father_name} onChange={handleChange} />
        </div>

        <div className="form-row two-col">
          <div>
            <RequiredLabel text="பாலினம்" />
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
          <div className="form-row">
          <RequiredLabel text="age" />
          <input type="number" min="18" name="age"
            placeholder="வயது"
            value={form.age} onChange={handleChange} required />
            </div>
             <div className="form-row">
<RequiredLabel text="blood_group" />
          <select name="blood_group" value={form.blood_group} onChange={handleChange} required>
            <option value="">இரத்த வகை</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>
          </div>
        </div>

        <div className="form-row two-col">
  <div className="form-row">
    <RequiredLabel text="மொபைல் எண்" />
    <input
      placeholder="மொபைல் எண்"
      name="mobile"
      value={form.mobile}
      onChange={handleChange}
      className={errors.mobile ? "input-error" : ""}
    />
    {errors.mobile && <span className="error">{errors.mobile}</span>}
  </div>

 <div className="form-row">
  <br />
    <input
      placeholder="மின்னஞ்சல்"
      name="email"
      value={form.email}
      onChange={handleChange}
    />
  </div>
</div>
<div className="form-row">
  <RequiredLabel text="பாஸ்வோர்ட்(ID card பதிவிறக்கத்திற்கு)" />
  
  <input
    type="password"
    name="password"
    placeholder="உங்கள் பாஸ்வோர்ட்"
    value={form.password}
    onChange={handleChange}
    required
  />
</div>
        <div className="form-row">
          <input value="Tamil Nadu" readOnly />
        </div>

        <div className="form-row">
          <DistrictSelect value={form.district} onChange={handleDistrictChange} />
        </div>

        <div className="form-row">
          <RequiredLabel text="உள்ளாட்சி வகை" />
          <select name="local_body" value={form.local_body} onChange={handleChange} required>
            <option value="">உள்ளாட்சி வகை</option>
            <option value="Ooratchi">ஊராட்சி</option>
            <option value="Peruratchi">பேரூராட்சி</option>
            <option value="Managaratchi">மாநகராட்சி</option>
          </select>
        </div>

        <div className="form-row">
          <RequiredLabel text="நகரம் / ஒன்றியம் / பகுதி" />
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
          <div className="form-row">
            <br />
          <input placeholder="வாக்காளர் எண்"
            name="voter_id" value={form.voter_id} onChange={handleChange} />
           </div>
           <div className="form-row">
           <RequiredLabel text="ஆதார் எண்" />
          <input placeholder="ஆதார் எண்"
            name="aadhaar" className={errors.aadhaar ? "input-error" : ""} value={form.aadhaar} onChange={handleChange} required
  maxLength="12" />{errors.aadhaar && <span className="error">{errors.aadhaar}</span>}
        </div>
        </div>

        <div className="form-row">
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </div>

        <button type="submit">பதிவு செய்யவும்</button>
      </form>
    </div>
  );
}
  