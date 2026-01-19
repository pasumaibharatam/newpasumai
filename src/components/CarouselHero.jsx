import React, { useState, useEffect } from "react";
import "./styles.css";
import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.jpeg";

const slides = [
  { img: slide1, caption: "We Work for People" },
  { img: slide2, caption: "Growth & Unity" },
  { img: slide3, caption: "Strong Tamil Nadu" },
];

export default function CarouselHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.img})` }}
        >
          <div className="caption">{s.caption}</div>
        </div>
      ))}
    </div>
  );
}
