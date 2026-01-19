import { useEffect, useState } from "react";
import "./HeroSlider.css";

import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.jpeg";

const slides = [
  {
    image: slide1,
    title: "பசுமை பாரத மக்கள் கட்சி",
    subtitle: "மக்கள் நலன் • சமூக நீதி • பசுமை இந்தியா",
  },
  {
    image: slide2,
    title: "மக்களுக்கான அரசியல்",
    subtitle: "நேர்மை • வளர்ச்சி • சமத்துவம்",
  },
  {
    image: slide3,
    title: "பசுமை இந்தியா",
    subtitle: "எதிர்கால தலைமுறைக்காக",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
        >
          <img src={slide.image} alt="Hero Banner" />
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <button className="hero-btn">Know More</button>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
