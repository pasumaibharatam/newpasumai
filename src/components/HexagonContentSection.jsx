import "./HexagonContentSection.css";

import img1 from "../assets/img4.avif";
import img2 from "../assets/img5.avif";
import img3 from "../assets/img6.avif";
import img4 from "../assets/img7.avif";

const HexagonContentSection = () => {
  return (
    <section className="hex-section">
      <div className="hex-container">

        {/* LEFT : Hexagon Images */}
        <div className="hex-left">
          <div className="hex hex-one">
            <img src={img1} alt="" />
          </div>
          <div className="hex hex-two">
            <img src={img2} alt="" />
          </div>
          <div className="hex hex-three">
            <img src={img3} alt="" />
          </div>
          <div className="hex hex-four">
            <img src={img4} alt="" />
          </div>
        </div>

        {/* RIGHT : Content */}
        <div className="hex-right">
          <h2>பசுமை பாரத மக்கள் கட்சி</h2>
          <p>
            பசுமை பாரத மக்கள் கட்சி என்பது மக்கள் நலன், சமூக நீதி மற்றும்
            சுற்றுச்சூழல் பாதுகாப்பை மையமாகக் கொண்டு செயல்படும் அரசியல்
            இயக்கமாகும்.
          </p>
          <p>
            கிராமங்களிலிருந்து நகரங்கள் வரை அனைவருக்கும் சமநிலை வளர்ச்சி,
            வேலைவாய்ப்பு மற்றும் சமூக பாதுகாப்பு உறுதி செய்யும் நோக்கத்துடன்
            எங்கள் இயக்கம் செயல்படுகிறது.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HexagonContentSection;
