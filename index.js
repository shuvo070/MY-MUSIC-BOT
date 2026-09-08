const config = require('./config.js');
const { ShardingManager } = require('discord.js');

const token = config.TOKEN || process.env.TOKEN;

// টোকেন আছে কিনা তা আগে পরীক্ষা করা হচ্ছে
if (!token) {
    console.error("❌ TOKEN পাওয়া যায়নি!");
    process.exit(1);
}

// Sharding সক্রিয় আছে কিনা তা চেক করা
if (config.shardManager?.shardStatus === true) {
    console.log("⚙️  ShardingManager শুরু হচ্ছে...");

    const manager = new ShardingManager('./bot.js', {
        token: token,
        totalShards: 'auto'
    });

    manager.on('shardCreate', (shard) => {
        console.log(`✅ Launched shard ${shard.id}`);
    });

    manager.on('error', (error) => {
        console.error("❌ Sharding Error:", error);
    });

    manager.spawn().catch((error) => {
        console.error("❌ Failed to spawn shards:", error);
    });

} else {
    console.log("🚀 Starting bot without sharding...");
    require('./bot.js');
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
