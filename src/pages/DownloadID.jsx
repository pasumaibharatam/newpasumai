import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import bg from "../assets/member-card.png";
import "./DownloadID.css";

export default function DownloadID() {
  const cardRef = useRef(null);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [candidate, setCandidate] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = () => {
    const stored = JSON.parse(localStorage.getItem("candidates")) || [];

    const found = stored.find(
      (c) => c.mobile === mobile && c.password === password
    );

    if (!found) {
      setError("Invalid mobile number or password");
      setCandidate(null);
      return;
    }

    setError("");
    setCandidate(found);
  };

  /* ✅ NO CROP DOWNLOAD */
  const downloadID = async () => {
    if (!cardRef.current) return;
 const images = cardRef.current.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve(true);
          else img.onload = resolve;
        })
    )
  );
    const { offsetWidth, offsetHeight } = cardRef.current;

  const dataUrl = await htmlToImage.toPng(cardRef.current, {
  width: 1011,
  height: 638,
  pixelRatio: 2,
  backgroundColor: "#ffffff", // MUST
});

    const link = document.createElement("a");
    link.download = `${candidate.name}-ID.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="download-page">
      <h2 className="page-title">Download Member ID</h2>

      {!candidate && (
        <div className="login-box">
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            maxLength="10"
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleVerify}>Verify</button>

          {error && <p className="error">{error}</p>}
        </div>
      )}

      {candidate && (
        <>
          {/* ID CARD */}
          <div className="id-card" ref={cardRef}>
            <img src={bg} alt="Member ID" className="id-bg" />

            <div className="id-overlay">
              <h1 className="party-title">பசுமை பாரத மக்கள் கட்சி</h1>

              {/* PHOTO */}
              <div className="card-body">
  <div className="details">
    <p><span>Member ID</span> : PBMK-{String(candidate.id).padStart(6, "0")}</p>
    <p><span>Name</span> : {candidate.name}</p>
    <p><span>Mobile</span> : {candidate.mobile}</p>
    <p><span>District</span> : {candidate.district}</p>
  </div>

  <div className="photo-box">
    {candidate.photo ? (
      <img
        src={candidate.photo}
        alt="Member"
        className="member-photo"
        crossOrigin="anonymous"
      />
    ) : (
      <div className="photo-placeholder">Photo</div>
    )}
  </div>
</div>


              <div className="card-footer">
                <span>www.pbmktn.org</span>
                <span>@pbmk_official</span>
              </div>
            </div>
          </div>

          <button className="download-btn" onClick={downloadID}>
            Download ID Card
          </button>
        </>
      )}
    </div>
  );
}
