import React, { useRef, useState } from "react";
import { FaBackward, FaPlay, FaPause, FaStop, FaForward } from "react-icons/fa";
import "./Player.css"; // Import CSS file for styling
import { useRadioChannels } from "../api/customHooks";

const Player = () => {
  const { channels, loading, error } = useRadioChannels();
  console.log("all channels", channels);
  const [audioState, setAudioState] = useState("stopped");
  const audioRef = useRef(null);

  // Handler to start playback
  const handlePlay = () => {
    audioRef.current.play();
    setAudioState("playing");
  };

  // Handler to stop playback
  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setAudioState("stopped");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="player-container">
      {/* Image */}
      <div className="img-container">
        <img src={channels[0].imagetemplate} alt="Album Art" />
      </div>
      {/* Channel Name */}
      <h3 className="channel-name">{channels[0].name}</h3>
      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={channels[0].liveaudio.url}
        autoPlay={false}
        controls
      ></audio>
      {/* Controls */}
      <div className="player-controls">
        {/* Play Button */}
        {audioState === "stopped" && (
          <FaPlay className="control-icon" onClick={handlePlay} title="Play" />
        )}
        {/* Stop Button */}
        {audioState === "playing" && (
          <FaStop className="control-icon" onClick={handleStop} title="Stop" />
        )}
      </div>
    </div>
  );
};

export default Player;
