import "./App.css";
import React, { useState, useEffect } from "react";
import p0 from "./assets/img/0.jpeg";
import p1 from "./assets/img/1.jpeg";
import p2 from "./assets/img/2.jpeg";
import p3 from "./assets/img/3.jpeg";
import p4 from "./assets/img/4.jpeg";
import p5 from "./assets/img/5.jpeg";
import p6 from "./assets/img/6.jpeg";
import p7 from "./assets/img/7.jpeg";
import p8 from "./assets/img/8.jpeg";

const App = () => {
  const images = [p0, p1, p2, p3, p4, p5, p6, p7, p8];
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  const [stationIndex, setStationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [channels, setChannels] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [currentSong, setCurrentSong] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const [currentImage, setCurrentImage] = useState(images[0]);
  const audioRef = React.useRef(null);

  useEffect(() => {
    getRadioChannels();
  }, []);

  useEffect(() => {
    if (channels.length > 0) {
      loadStation();
    }
  }, [channels, stationIndex]);

  const getRadioChannels = async () => {
    try {
      const response = await fetch(
        "https://api.sr.se/api/v2/channels?format=json&indent=true&pagination=false"
      );
      const data = await response.json();
      const fetchedChannels = data.channels;
      setChannels(fetchedChannels);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchCurrentlyPlayingByChannelId = async (id) => {
    try {
      const response = await fetch(
        `http://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id}&format=json&indent=true`
      );
      if (!response.ok) {
        throw Error("Did not receive expected data");
      }
      const playlistData = await response.json();
      setPlaylist(playlistData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchCurrentSchedulePlayingByChannelId = async (id) => {
    try {
      const response = await fetch(
        `https://api.sr.se/v2/scheduledepisodes?channelid=${id}&format=json&indent=true`
      );
      if (!response.ok) {
        throw Error("Did not receive expected data");
      }
      const scheduleData = await response.json();
      setSchedule(scheduleData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const loadStation = async () => {
    const channel = channels[stationIndex];
    setCurrentSong("");
    setProgressPercent(0);
    setIsPlaying(false);
    fetchCurrentlyPlayingByChannelId(channel.id);
    fetchCurrentSchedulePlayingByChannelId(channel.id);
  };

  const playStation = () => {
    setIsPlaying(true);
    setCurrentSong(playlist.song[0].description);
    audioRef.current.play();
  };

  const pauseStation = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const prevStation = () => {
    let newIndex = stationIndex - 1;
    if (newIndex < 0) {
      newIndex = channels.length - 1;
    }
    setStationIndex(newIndex);
    audioRef.current.play();
  };

  const nextStation = () => {
    let newIndex = stationIndex + 1;
    if (newIndex >= channels.length) {
      newIndex = 0;
    }
    setStationIndex(newIndex);
    audioRef.current.play();
  };

  // const updateProgressBar = (e) => {
  //   if (isPlaying) {
  //     const { duration, currentTime } = e.target;
  //     const progressPercent = (currentTime / duration) * 100;
  //     setCurrentTime(currentTime);
  //     setDuration(duration);
  //     setProgressPercent(progressPercent);
  //   }
  // };

  // const setProgressBar = (e) => {
  //   const width = progressContainer.getAttribute("width");
  //   const clickX = e.nativeEvent.offsetX;
  //   const { duration } = music;
  //   const newCurrentTime = (clickX / width) * duration;
  //   music.currentTime = newCurrentTime;
  //   setCurrentTime(newCurrentTime);
  // };

  return (
    <div className="player-container">
      <div className="img-container">
        <img src={randomImage} alt="Album Art" />
      </div>
      <div className="player-details">
        <h2>{channels[stationIndex]?.name}</h2>
        <h3>{currentSong || "No song available"}</h3>
        <audio
          src={channels[stationIndex]?.liveaudio.url}
          onPlay={playStation}
          onPause={pauseStation}
          onEnded={nextStation}
          // onTimeUpdate={updateProgressBar}
          ref={audioRef}
        ></audio>
      </div>
      {/* <div
        className="progress-container"
        id="progress-container"
        onClick={setProgressBar}
      >
        <div
          className="progress"
          id="progress"
          style={{ width: `${progressPercent}%` }}
        ></div>
        <div className="duration-wrapper">
          <span id="current-time">{currentTime}</span>
          <span id="duration">{duration}</span>
        </div>
      </div> */}
      <div className="player-controls">
        <button onClick={prevStation}>
          <i className="fas fa-backward" title="Previous"></i>
        </button>

        {isPlaying ? (
          <button onClick={pauseStation}>
            <i className="fas fa-pause main-button" title="Pause"></i>
          </button>
        ) : (
          <button onClick={playStation}>
            <i className="fas fa-play main-button" title="Play"></i>
          </button>
        )}
        <button onClick={nextStation}>
          <i className="fas fa-forward" title="Next"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
