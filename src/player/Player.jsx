import React from "react";
import "./player.css";
import { FaBackward, FaPause, FaPlay, FaForward } from "react-icons/fa";
import { useState, useRef } from "react";

const Player = ({ channels }) => {
  console.log(channels);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef(); // grab audio elem to play pause

  const handlePlay = () => {
    console.log("Play!");
    setIsPlaying(!isPlaying);
    audioPlayer.current.play();
  };
  const handlePause = () => {
    console.log("Pause!");
    setIsPlaying(!isPlaying);
    audioPlayer.current.pause();
  };

  const handleBack = () => {
    console.log("Back!");
  };

  const handleNext = () => {
    console.log("Next!");
  };
  return (
    <div className="player-container">
      {/* Song */}
      <div className="img-container">
        <img
          src="https://images.pexels.com/photos/9992536/pexels-photo-9992536.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=180"
          alt="Album Art"
        />
      </div>
      {/* Now playing */}
      <div className="player-details">
        <h2 id="channel">P1</h2>
        <h3 id="song">Misc</h3>
        <audio
          src="https://sverigesradio.se/topsy/direkt/srapi/132.mp3"
          ref={audioPlayer}
        ></audio>
      </div>
      {/* Progress  */}
      <div className="progress-container" id="progress-container">
        <div className="progress" id="progress"></div>
        <div className="duration-wrapper">
          <span id="current-time">0:00</span>
        </div>
      </div>
      {/* Controls  */}
      <div className="player-controls">
        {/* rewrite these */}
        <FaBackward
          onClick={handleBack}
          className="fas prev"
          id="prev"
          title="Previous"
        />
        {isPlaying ? (
          <FaPause
            onClick={handlePause}
            className="fas pause"
            id="pause"
            title="Pause"
          />
        ) : (
          <FaPlay
            onClick={handlePlay}
            className="fas play"
            id="play"
            title="Play"
          />
        )}

        <FaForward
          onClick={handleNext}
          className="fas next"
          id="next"
          title="Next"
        />
      </div>
    </div>
  );
};

export default Player;
