import React from "react";
import "./VideoGrid.css";

const videos = [
  { id: 1, title: "Video 1", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Video 2", url: "https://www.youtube.com/embed/9bZkp7q19f0" },
  { id: 3, title: "Video 3", url: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
  { id: 4, title: "Video 4", url: "https://www.youtube.com/embed/L_jWHffIx5E" },
  // { id: 5, title: "Video 5", url: "https://www.youtube.com/embed/V-_O7nl0Ii0" },
];

function VideoGrid() {
  return (
    <section className="video-grid-section">
      
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <iframe
              width="100%"
              height="200"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VideoGrid;
