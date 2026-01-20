import { useEffect, useState } from "react";
import "./CarouselHero.css";

import slide1 from "../assets/d1.jfif";
 import slide2 from "../assets/d2.jfif";
import slide3 from "../assets/d3.jfif";

const slides = [
  {
    image: slide1,
    title: "We Work for People",
    subtitle: "Progress • Unity • Justice",
  },
  {
    image: slide2,
    title: "Growth & Unity",
    subtitle: "Development for Everyone",
  },
  {
    image: slide3,
    title: "Strong Tamil Nadu",
    subtitle: "Future for Next Generation",
  },
];

export default function CarouselHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="carousel-hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${
            index === current ? "active" : ""
          }`}
        >
          <img src={slide.image} alt={slide.title} />

          <div className="carousel-overlay" />

          <div className="carousel-content">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
