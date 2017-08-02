const Discord = require('discord.js');
const Minecraft = require('mc-utils');
exports.run = (client, message, args) =>{

  Minecraft.ping(args[0], args[1], function(err, res) {
    if(err) {
      console.log(err);
    } else {
      const embed = new Discord.RichEmbed()
        .setAuthor(`'${args.join(' ')}'`)
        .setDescription(`${res.description}`)
        .setColor('#11960a')
        .addField('Version', `${res.versions.name}`, true)
        .addField('Players max.', `${res.players.max}`, true)
        .addField('Players online', `${res.players.online}`, true);
      message.channel.send({embed});
    }
  }, 3000);

//   Minecraft.ping('mc.hypixel.net', 25565, function(err, res) {
//     if(err) {
//       console.log(err);
//       return
//     }
//     const embed = new Discord.RichEmbed()
//       .setAuthor(`'${args.join(' ')}'`)
//       .setDescription(`${res.description}`)
//       .setColor('#11960a')
//       .addField('Version', `${res.versions.name}`, true)
//       .addField('Players max.', `${res.players.max}`, true)
//       .addField('Players online', `${res.players.online}`, true)
//     message.channel.send({embed})
//   }, 3000);
};

exports.help = {
  name: 'mcserver',
  description: '🔧 Gets a Minecraft server status',
  usage: 'mcserver [IP] [PORT]'
};
