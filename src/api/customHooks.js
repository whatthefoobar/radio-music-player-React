// const defaultChannelId = "132"; not used

// import { useState, useEffect } from "react";

// export const useRadioChannels = () => {
//   const [channels, setChannels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRadioChannels = async () => {
//       const channelsUrl =
//         "https://api.sr.se/api/v2/channels?format=json&indent=true&pagination=false";
//       try {
//         const response = await fetch(channelsUrl);
//         if (!response.ok) {
//           throw Error("Failed to fetch radio channels");
//         }
//         const data = await response.json();
//         const fetchedChannels = data.channels;
//         setChannels(fetchedChannels);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchRadioChannels();

//     return () => {
//       // Cleanup function (if needed)
//     };
//   }, []);

//   return { channels, loading, error };
// };

// export const useCurrentlyPlayingByChannelId = (channelId) => {
//   const [playlist, setPlaylist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCurrentlyPlayingByChannelId = async (id) => {
//       const defaultApiUrl = "http://api.sr.se/api/v2";
//       try {
//         let response = await fetch(
//           `${defaultApiUrl}/playlists/getplaylistbychannelid?id=${id}&format=json&indent=true`
//         );
//         if (!response.ok) throw Error("Did not receive expected data");
//         let playlist = await response.json();
//         setPlaylist(playlist);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchCurrentlyPlayingByChannelId(channelId);

//     return () => {
//       // Cleanup function (if needed)
//     };
//   }, [channelId]);

//   return { playlist, loading, error };
// };
