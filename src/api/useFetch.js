// const defaultChannelId = "132"; not used

// get all channel ids
export async function getRadioChannels() {
  const channelsUrl =
    "https://api.sr.se/api/v2/channels?format=json&indent=true&pagination=false";
  try {
    let response = await fetch(channelsUrl);
    let res = await response.json();
    const channels = res.channels;

    console.log("All channels: ", channels);
    return channels;
  } catch (error) {
    console.log("error :", error);
  }
}

export async function fetchCurrentlyPlayingByChannelId(id) {
  const defaultApiUrl = "http://api.sr.se/api/v2";
  try {
    let response = await fetch(
      `${defaultApiUrl}/playlists/getplaylistbychannelid?id=${id}&format=json&indent=true`
    );
    if (!response.ok) throw Error("Did not receive expected data");
    let playlist = await response.json();
    // const channels = res.channels;

    // console.log("All channels: ", channels);
    console.log(playlist);
    return playlist;
  } catch (error) {
    // console.log("error :", error);
    console.log(error.message);
  }
}
