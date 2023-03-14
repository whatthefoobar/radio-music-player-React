import "./App.css";
import Player from "./player/Player";
import { useEffect, useState } from "react";
import {
  getRadioChannels,
  fetchCurrentlyPlayingByChannelId,
} from "./api/useFetch";

function App() {
  const [channels, setChannels] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    getRadioChannels().then((res) => setChannels(res));
    console.log("all channels", channels);
  }, []);

  return (
    <div className="App">
      <h2>Get your music here</h2>

      <Player channels={channels} />
    </div>
  );
}

export default App;
