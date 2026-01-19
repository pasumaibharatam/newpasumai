import React from "react";
import "./HexagonSection.css";
import img1 from "../assets/img1.avif";
import img2 from "../assets/img2.avif";
import img3 from "../assets/img3.avif";
import img4 from "../assets/img4.avif";
import img5 from "../assets/img5.avif";
import img6 from "../assets/img6.avif";
import img7 from "../assets/img7.avif";
import img8 from "../assets/img8.avif";
import img9 from "../assets/img9.avif";
import img10 from "../assets/img10.avif";

const pages = [
  {  img: img1 },
  {  img: img2 },
  {  img: img3 },
   {  img: img4 },
  { img: img5 },
  { img: img6 },
  { img: img7 },
  { img: img8 },
  { img: img9 },
  {  img: img10 },
];

function HexagonSection() {
  return (
    <section className="hexagon-section">
      <div className="hexagon-left">
        <h2>Our Pages</h2>
        <p>
          Explore our pages through this visual hexagon layout. Each block represents a page with an image.
        </p>
        <p>
          Click on any hexagon to access the corresponding page or content section.
        </p>
      </div>

      <div className="hexagon-right">
        {pages.map((page, index) => (
          <div key={index} className="hexagon">
            <img src={page.img} alt={page.title} />
            <span>{page.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HexagonSection;
