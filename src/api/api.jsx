const defaultApiUrl = "http://api.sr.se/api/v2";

export async function fetchAllChanels() {
  return fetch(`${defaultApiUrl}/channels?format=json`)
    .then((res) => res.json())
    .then((data) => data.channels)
    .then((err) => console.log(err));
}

export async function fetchChannelById(id) {
  return fetch(`${defaultApiUrl}/channels/${id}?format=json`)
    .then((res) => res.json())
    .then((data) => data.channel)
    .then((err) => console.log(err));
}

export async function fetchPlaylistById(id) {
  return fetch(
    `${defaultApiUrl}/playlists/getplaylistbychannelid?id=${id}?format=json`
  )
    .then((res) => res.json())
    .then((data) => data.song)
    .then((err) => console.log(err));
}

async function fetchRecipe() {
  return await fetch(
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2"
  )
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then((err) => console.log(err));
}
