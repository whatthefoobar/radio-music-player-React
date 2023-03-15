import "./App.css";
import Player from "./player/Player";
import { useEffect, useState } from "react";
import {
  getRadioChannels,
  fetchCurrentlyPlayingByChannelId,
} from "./api/useFetch";

function App() {
  const [channels, setChannels] = useState([]);
  const [channelIds, setChannelIds] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    getRadioChannels().then((res) => setChannels(res));

    channels.map((channel) => {
      setChannelIds(channelIds.push(channel.id));
    });
  }, []);

  return (
    <div className="App">
      <h2>Get your music here</h2>

      <Player channels={channels} channelIds={channelIds} />
    </div>
  );
}

export default App;
