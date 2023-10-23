const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "https://mattparisien.github.io"],
  })
);

app.get("/", (req, res) => {
  res.redirect("/episodes");
});

app.get("/episodes", async (req, res) => {
  const url = `https://itunes.apple.com/lookup?id=1539431210&media=podcast&entity=podcastEpisode&limit=100`;
  const { data } = await axios.get(url);
  res.json(data.results);
});

app.get("/episodes/:id", async (req, res) => {
  const episodeId = parseInt(req.params.id);
  const url = `https://itunes.apple.com/lookup?id=1539431210&media=podcast&entity=podcastEpisode&limit=100`;
  const { data } = await axios.get(url);

  const episode = data.results.reverse()[episodeId + 1];

  res.json(episode);
});

app.listen(PORT, () => console.log("Server running"));
