const config = require("./config.js");
const { ShardingManager } = require("discord.js");

const token = config.TOKEN || process.env.TOKEN;

if (!token) {
    console.error("❌ TOKEN পাওয়া যায়নি!");
    process.exit(1);
}

if (config.shardManager?.shardStatus === true) {
    const manager = new ShardingManager("./bot.js", {
        token: token,
        totalShards: "auto"
    });

    manager.on("shardCreate", (shard) => {
        console.log(`✅ Launched shard ${shard.id}`);
    });

    manager.on("error", (error) => {
        console.error("❌ Sharding Error:", error);
    });

    manager.spawn().catch((error) => {
        console.error("❌ Failed to spawn shards:", error);
    });

} else {
    console.log("🚀 Starting bot without sharding...");

    require("./bot.js");
}
/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/
