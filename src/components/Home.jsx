import React from "react";

import CarouselHero from "./CarouselHero";
import "./styles.css";
import VideoGrid from "./VideoGrid";
import HexagonSection from "./HexagonSection";
import FireHeroSection from "./FireHeroSection";
import HexagonContentSection from "./HexagonContentSection";

export default function Home() {
  return (
    <>
      
      <section id="home">
        <CarouselHero />
      </section>
<section id="hexcont">
        <HexagonContentSection />
      </section>
      <section id="about" className="section about">
        <FireHeroSection />
      </section>
      <section id="video" className="section video">
        <h2>சாதனைகள்</h2>
        <p>மாநிலங்களின் உரிமைக்கான உறுதியான குரலாகத்  இன்று இந்தியா முழுவதும் ஒலிக்கிறது. எங்கள் முக்கிய சாதனைகளில் சில இங்கே.</p>
         <VideoGrid />
      </section>
      <section id="impact" className="section impact">
        <h2>Impact</h2>
        <div className="impact-cards">
          <div className="impact-card">
            <h3>40+</h3>
            <p>Districts</p>
          </div>
          <div className="impact-card">
            <h3>50,000+</h3>
            <p>Members</p>
          </div>
          <div className="impact-card">
            <h3>1200+</h3>
            <p>Campaigns</p>
          </div>
        </div>
      </section>
<section id="hex">
        <HexagonSection/>
      </section>
      <section id="join" className="section join-cta">
        <h2>இணையுங்கள்</h2>
        <p>வளமான தமிழ்நாட்டை உருவாக்கும் உறுப்பினராக சேர பதிவு செய்யவும். அனைவரும் இணைந்து சமூக மாற்றத்தை ஏற்படுத்துவோம்.</p>
        <button className="btn primary">Become a Member</button>
      </section>
    </>
  );
}
