import React, { useState } from "react";
import "./VideoSlider.css";

const videos = [
  { id: 1, title: "Video 1", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Video 2", url: "https://www.youtube.com/embed/9bZkp7q19f0" },
  { id: 3, title: "Video 3", url: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
  { id: 4, title: "Video 4", url: "https://www.youtube.com/embed/L_jWHffIx5E" },
  { id: 5, title: "Video 5", url: "https://www.youtube.com/embed/V-_O7nl0Ii0" },
  { id: 6, title: "Video 6", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 7, title: "Video 7", url: "https://www.youtube.com/embed/9bZkp7q19f0" },
  { id: 8, title: "Video 8", url: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
];

const VIDEOS_PER_SLIDE = 4;

function VideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.ceil(videos.length / VIDEOS_PER_SLIDE) - 1;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="video-slider-section">
      <button className="nav-btn left" onClick={prevSlide} disabled={currentIndex === 0}>
        ‹
      </button>

      <div className="slider-window">
        <div
          className="video-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {videos.map((video) => (
            <div className="video-item" key={video.id}>
              <iframe
                src={video.url}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p>{video.title}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="nav-btn right"
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
      >
        ›
      </button>
    </section>
  );
}

export default VideoSlider;
