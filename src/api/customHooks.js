// const defaultChannelId = "132"; not used

import { useState, useEffect } from "react";

export const useRadioChannels = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRadioChannels = async () => {
      const channelsUrl =
        "https://api.sr.se/api/v2/channels?format=json&indent=true&pagination=false";
      try {
        const response = await fetch(channelsUrl);
        if (!response.ok) {
          throw Error("Failed to fetch radio channels");
        }
        const data = await response.json();
        const fetchedChannels = data.channels;
        setChannels(fetchedChannels);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRadioChannels();

    return () => {
      // Cleanup function (if needed)
    };
  }, []);

  return { channels, loading, error };
};

export const useCurrentlyPlayingByChannelId = (id) => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      const defaultApiUrl = "https://api.sr.se/api/v2";
      const apiUrl = `${defaultApiUrl}/playlists/getplaylistbychannelid?id=${id}&format=json&indent=true`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw Error("Failed to fetch currently playing playlist");
        }
        const playlistData = await response.json();
        setPlaylist(playlistData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCurrentlyPlaying();

    return () => {
      // Cleanup function (if needed)
    };
  }, [id]);

  return { playlist, loading, error };
};
