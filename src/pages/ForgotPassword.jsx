import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [aadhaarLast4, setAadhaarLast4] = useState("");
  const [error, setError] = useState("");

  const handleRecover = () => {
    const stored = JSON.parse(localStorage.getItem("candidates")) || [];

    const index = stored.findIndex(
      (c) =>
        c.name.toLowerCase() === name.toLowerCase() &&
        c.aadhaar?.slice(-4) === aadhaarLast4
    );

    if (index === -1) {
      setError("விவரங்கள் பொருந்தவில்லை ❌");
      return;
    }

    // DELETE candidate
    stored.splice(index, 1);
    localStorage.setItem("candidates", JSON.stringify(stored));

    alert(
      "உங்கள் பழைய பதிவு நீக்கப்பட்டது ✅\n\nதயவுசெய்து மீண்டும் பதிவு செய்யவும்."
    );

    navigate("/register");
  };

  return (
    <div className="register-container">
      <h2>Forgot Password</h2>

      <div className="register-form">
        <div className="form-row">
          <label>முழு பெயர்</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>ஆதார் கடைசி 4 இலக்கங்கள்</label>
          <input
            maxLength="4"
            value={aadhaarLast4}
            onChange={(e) =>
              /^\d*$/.test(e.target.value) &&
              setAadhaarLast4(e.target.value)
            }
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleRecover}>
          Delete & Register Again
        </button>
      </div>
    </div>
  );
}
