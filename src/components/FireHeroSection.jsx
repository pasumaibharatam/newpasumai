import { useEffect, useState } from "react";
import "./FireHeroSection.css";

import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.jpeg";

const images = [slide1, slide2, slide3];

const FireHeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="fire-section">
      <div className="fire-border">
        <h1 className="party-title">பசுமை பாரத மக்கள் கட்சி</h1>

        <div className="slider">
  <div className="slide-track">
    <img src={slide1} alt="" />
    <img src={slide2} alt="" />
    <img src={slide3} alt="" />

    {/* duplicate images for smooth infinite loop */}
    <img src={slide1} alt="" />
    <img src={slide2} alt="" />
    <img src={slide3} alt="" />
  </div>
</div>

        <p className="party-tagline">
          மக்கள் நலன் • சமூக நீதி • பசுமை இந்தியா
        </p>
      </div>
    </section>
  );
};

export default FireHeroSection;
