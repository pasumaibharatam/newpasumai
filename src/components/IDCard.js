import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import "./IDCard.css";

const IDCard = ({ candidate }) => {
  const cardRef = useRef(null);

  const downloadID = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current);
    const link = document.createElement("a");
    link.download = `${candidate.name}-ID.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      <div className="id-card" ref={cardRef}>
        <div className="id-header">
          <h3>பசுமை பாரத மக்கள் கட்சி</h3>
        </div>

        <div className="id-body">
          <img
            src={candidate.photo || "/default-user.png"}
            alt="profile"
            className="id-photo"
          />

          <div className="id-details">
            <p><b>Name:</b> {candidate.name}</p>
            <p><b>Mobile:</b> {candidate.mobile}</p>
            <p><b>District:</b> {candidate.district}</p>
            <p><b>ID No:</b> PBMK-{candidate.id}</p>
          </div>
        </div>

        <div className="id-footer">
          <p>Authorized Member</p>
        </div>
      </div>

      <button className="download-btn" onClick={downloadID}>
        Download ID Card
      </button>
    </>
  );
};

export default IDCard;
