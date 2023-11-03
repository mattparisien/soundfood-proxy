const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

require("dotenv").config();

app.use(
  cors({
    origin: [...process.env.CORS_WHITELIST.split(" ")],
  })
);

app.get("/", (req, res) => {
  res.redirect("/episodes");
});

app.get("/episodes", async (req, res) => {
  const url = process.env.APPLE_PODCASTS_ENDPOINT;
  const { data } = await axios.get(url);
  res.json(data.results);
});

app.get("/episodes/:id", async (req, res) => {
  const episodeId = req.params.id !== "current" ? parseInt(req.params.id) : null;
  const url = process.env.APPLE_PODCASTS_ENDPOINT;
  const { data } = await axios.get(url);

  const episodeNumber = episodeId == "current" ? data.results.length - 2 : episodeId;

  const episode = data.results.reverse()[episodeNumber];

  res.json({ ...episode, episodeNumber: episodeNumber || 1 });

  console.log({
    ...episode,
    episodeNumber: episodeNumber || 1,
  });
});

app.listen(PORT, () => console.log("Server running!"));
