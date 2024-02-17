import React, { useEffect, useRef, useState } from "react";
import { FaBackward, FaPlay, FaPause, FaStop, FaForward } from "react-icons/fa";
import "./Player.css"; // Import CSS file for styling
import {
  useFetchRadioChannelsQuery,
  useFetchRadioPlaylistByIdQuery,
} from "../slices/apiSlice";

const Player = () => {
  const { data: channels, isLoading } = useFetchRadioChannelsQuery();
  console.log("all channels", channels);

  const [audioState, setAudioState] = useState("stopped");
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [channelsIds, setChannelsIds] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (channels && channels.length > 0) {
    }
    setChannelsIds(channels.channels.map((obj) => obj.id));
  }, [channels]);

  useEffect(() => {
    console.log(channelsIds);
  }, [channelsIds]);

  const {
    data: playlist,
    loading: playlistLoading,
    error: playlistError,
  } = useFetchRadioPlaylistByIdQuery(channels.channels[currentChannelIndex].id);
  // console.log("current channel id", channels.channels[currentChannelIndex].id);
  console.log("playlist:", playlist);
  // console.log("current song playing", playlist.song[0].description);

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

  // Handler to play the next channel
  const handleNext = () => {
    if (currentChannelIndex === channels.length - 1) {
      setCurrentChannelIndex(0); // If at the last channel, loop back to the first channel
    } else {
      setCurrentChannelIndex(currentChannelIndex + 1); // Move to the next channel
    }
    setAudioState("stopped"); // Stop playback when changing channels
  };

  // Handler to play the previous channel
  const handlePrevious = () => {
    if (currentChannelIndex === 0) {
      setCurrentChannelIndex(channels.length - 1); // If at the first channel, move to the last channel
    } else {
      setCurrentChannelIndex(currentChannelIndex - 1); // Move to the previous channel
    }
    setAudioState("stopped"); // Stop playback when changing channels
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="player-container">
      {/* Image */}
      <div className="img-container">
        <img
          src={channels.channels[currentChannelIndex].imagetemplate}
          alt="Album Art"
        />
      </div>
      {/* Channel Name */}
      <h3 className="channel-name">
        {channels.channels[currentChannelIndex].name}
      </h3>
      {/* Now Playing */}
      <div className="now-playing">
        Now Playing: {playlist.song[0].description}
      </div>

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={channels.channels[currentChannelIndex].liveaudio.url}
        autoPlay={false}
        controls
      ></audio>
      {/* Controls */}
      <div className="player-controls">
        {/* Previous Button */}
        <FaBackward
          className="control-icon"
          onClick={handlePrevious}
          title="Previous"
        />
        {/* Play Button */}
        {audioState === "stopped" && (
          <FaPlay className="control-icon" onClick={handlePlay} title="Play" />
        )}
        {/* Stop Button */}
        {audioState === "playing" && (
          <FaStop className="control-icon" onClick={handleStop} title="Stop" />
        )}
        {/* Next Button */}
        <FaForward className="control-icon" onClick={handleNext} title="Next" />
      </div>
    </div>
    // <div>BLA</div>
  );
};

export default Player;
