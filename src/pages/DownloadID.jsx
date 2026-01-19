// src/pages/DownloadID.js
import React from "react";

function DownloadID({ language }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>
        {language === "en" ? "Download Your ID" : "உங்கள் ஐடியைப் பதிவிறக்கவும்"}
      </h1>
      <p>
        {language === "en"
          ? "Here you can download your ID."
          : "இங்கே நீங்கள் உங்கள் ஐடியைப் பதிவிறக்கலாம்."}
      </p>

      {/* Example download button */}
      <a
        href="/sample-id.pdf" // replace with your file URL or dynamic link
        download
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#2c3e50",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        {language === "en" ? "Download ID" : "ஐடி பதிவிறக்கவும்"}
      </a>
    </div>
  );
}

export default DownloadID;
