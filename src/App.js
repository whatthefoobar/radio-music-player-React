import { useEffect, useState } from "react";
import "./App.css";
import Player from "./player/Player";
import "./index.css";
import {
  getRadioChannels,
  fetchCurrentlyPlayingByChannelId,
} from "./api/useFetch";

function App() {
  const [channels, setChannels] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    getRadioChannels().then((res) => setChannels(res));
  }, []);

  const handlePlay = () => {
    console.log("Play!");
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
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
}

export default App;
