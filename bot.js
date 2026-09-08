/*
  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   # MADE BY RTX!!
   ## Contact [ DISCORD SERVER : https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/

const { Client, GatewayIntentBits } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");

const { printWatermark } = require("./util/pw");
const config = require("./config.js");

const fs = require("fs");
const path = require("path");
const express = require("express");

// ==================== DISCORD CLIENT ====================

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});

client.config = config;

// ==================== DISTUBE ====================

client.player = new DisTube(client, {
  leaveOnStop: config.opt.voiceConfig.leaveOnStop,
  leaveOnFinish: config.opt.voiceConfig.leaveOnFinish,
  leaveOnEmpty: config.opt.voiceConfig.leaveOnEmpty.status,

  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,

  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
    new DeezerPlugin(),
  ],
});

process.env.YTDL_NO_UPDATE = true;

const player = client.player;

// ==================== LOAD EVENTS ====================

fs.readdir("./events", (err, files) => {
  if (err) {
    console.log("❌ Events folder error:", err);
    return;
  }

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;

    try {
      const event = require(`./events/${file}`);
      const eventName = file.split(".")[0];

      client.on(eventName, event.bind(null, client));

      delete require.cache[require.resolve(`./events/${file}`)];
    } catch (error) {
      console.log(`❌ Failed to load event: ${file}`);
      console.log(error);
    }
  });
});

// ==================== LOAD PLAYER EVENTS ====================

fs.readdir("./events/player", (err, files) => {
  if (err) {
    console.log("❌ Player events folder error:", err);
    return;
  }

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;

    try {
      const playerEvent = require(`./events/player/${file}`);
      const playerName = file.split(".")[0];

      player.on(playerName, playerEvent.bind(null, client));

      delete require.cache[require.resolve(`./events/player/${file}`)];
    } catch (error) {
      console.log(`❌ Failed to load player event: ${file}`);
      console.log(error);
    }
  });
});

// ==================== LOAD COMMANDS ====================

client.commands = [];

fs.readdir(config.commandsDir, (err, files) => {
  if (err) {
    console.log("❌ Commands folder error:", err);
    return;
  }

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;

    try {
      const command = require(`${config.commandsDir}/${file}`);

      client.commands.push({
        name: command.name,
        description: command.description,
        options: command.options,
      });
    } catch (error) {
      console.log(`❌ Failed to load command: ${file}`);
      console.log(error);
    }
  });

  console.log(`🚀 Commands Loaded!`);
});

// ==================== DISCORD LOGIN ====================

const TOKEN = config.TOKEN || process.env.TOKEN;

if (TOKEN) {
  client
    .login(TOKEN)
    .then(() => {
      console.log("🤖 Discord Bot Logged In!");
    })
    .catch((error) => {
      console.log("❌ TOKEN ERROR!");
      console.log(error);
    });
} else {
  console.log("❌ TOKEN ERROR: TOKEN is missing!");
}

// ==================== MONGODB ====================

const MONGO_URL = config.mongodbURL || process.env.MONGO;

if (MONGO_URL) {
  const mongoose = require("mongoose");

  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("\x1b[32m%s\x1b[0m", "🍔 Connected MongoDB!");
    })
    .catch((error) => {
      console.log("❌ Failed to connect MongoDB!");
      console.log(error);
    });
} else {
  console.log("❌ Error: MongoDB URL is missing!");
}

// ==================== EXPRESS SERVER ====================

const app = express();

// IMPORTANT FOR RENDER
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const imagePath = path.join(__dirname, "index.html");

  res.sendFile(imagePath, (error) => {
    if (error) {
      console.log("❌ index.html not found!");
      res.status(404).send("RTX Music Bot is Online!");
    }
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🔗 Listening to RTX on port: ${port}`);
  console.log("✨ Happy New Year Welcome To 2024");
});

// ==================== WATERMARK ====================

printWatermark();

/*
  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   # MADE BY RTX!!
   ## FEEL FREE TO USE ANY PART OF CODE
*/
