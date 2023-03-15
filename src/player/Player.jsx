import React from "react";
import "./player.css";
import { FaBackward, FaPause, FaPlay, FaForward } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { fetchCurrentlyPlayingByChannelId } from "../api/useFetch";

const Player = ({ channels, channelIds }) => {
  console.log("all channels", channels);
  console.log("all channel ids", channelIds);
  console.log(channelIds[0]);

  // filter out an object by its id from channels:
  let radio = channels.filter((channel) => channel.id === channelIds[1]).pop();
  console.log("radio", radio);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef(); // grab audio elem to play pause

  // useEffect(() => {
  //   fetchCurrentlyPlayingByChannelId(channelIds[0]).then((res) =>
  //     console.log("fetched radio by 1st id", res)
  //   );
  // }, []);

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
  const { id, image, imagetemplate, liveaudio, name, tagline } = radio;
  return (
    <div className="player-container">
      {/* Song */}
      <div className="img-container">
        <img src={imagetemplate} alt="Album Art" />
      </div>
      {/* Now playing */}
      <div className="player-details">
        <h2 id="channel">{name}</h2>
        <h3 id="song">Song name here</h3>
        <audio src={liveaudio.url} ref={audioPlayer}></audio>
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
