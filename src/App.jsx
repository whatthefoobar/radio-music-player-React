// App component
import React from "react";
import Player from "./player/Player";

const App = () => {
  const channelId = "123"; // Provide your channel ID here or dynamically get it

  return (
    <div>
      <Player /> {/* Render the Player component */}
    </div>
  );
};

export default App;
