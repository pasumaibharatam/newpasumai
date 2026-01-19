import { useEffect, useState } from "react";
import "./HeroSlider.css";

import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.jpeg";

const slides = [slide1, slide2, slide3];

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Fire border */}
      <div className="hero-border"></div>

      <div className="hero-inner">
        {/* Dark overlay */}
        <div className="hero-overlay"></div>

        {/* Image */}
        <img
          src={slides[index]}
          srcSet={`
            ${slides[index]} 1920w,
            ${slides[index]} 2560w
          `}
          sizes="100vw"
          alt="Hero Slide"
          className="hero-img"
          loading="eager"
          decoding="async"
        />

        {/* Text */}
        <div className="hero-text">
          <h1>பசுமை பாரத மக்கள் கட்சி</h1>
          <p>மக்கள் நலன் • சமூக நீதி • பசுமை இந்தியா</p>
        </div>
      </div>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
