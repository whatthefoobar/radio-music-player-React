import { useEffect, useState } from "react";
import "./App.css";
import Player from "./player/Player";
import {
  getRadioChannels,
  fetchCurrentlyPlayingByChannelId,
} from "./api/useFetch";

function App() {
  const [channels, setChannels] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    getRadioChannels().then((res) => setChannels(res));
  }, []);

  const handlePlay = () => {
    console.log("Play!");
  };
  const handlePause = () => {
    console.log("Pause!");
  };

  const handleBack = () => {
    console.log("Back!");
  };

  const handleNext = () => {
    console.log("Next!");
  };

  return (
    <div className="App">
      <h2>Get your music here</h2>
      <Player
        isPlaying={isPlaying}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
}

export default App;
