import React, { useState } from 'react';
import './video.css';

export const VideoHome = () => {
  const [video, setVideo] = useState(Math.floor(Math.random() * 7) + 1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const changeVideo = () => {
    setVideo(Math.floor(Math.random() * 7) + 1);
    setIsVideoLoaded(false);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="video-container">
      {isVideoLoaded ? (
        <video className="video" autoPlay muted playsInline src={`https://img-motion.s3.us-east-2.amazonaws.com/${video}.mp4`} onEnded={changeVideo} onLoadedData={handleVideoLoaded}></video>
      ) : (
        <div style={{ display: 'none' }}>
          <video className="video" autoPlay muted playsInline src={`https://img-motion.s3.us-east-2.amazonaws.com/${video}.mp4`} onEnded={changeVideo} onLoadedData={handleVideoLoaded}></video>
        </div>
      )}
    </div>
  );
};
