const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('ready', () => {
    console.log(`┌──────────────────────────────────────────────────────────────────────────┐\n|${client.user.tag} is up in ${client.guilds.size} guilds, for ${client.users.size} users!\n|Flight started at ${new Date() }\n|Using Gbot by Pesky12!\n└──────────────────────────────────────────────────────────────────────────┘`);
    client.user.setPresence({ game: { name: `use ${config.prefix}help | Serving in: ${client.guilds.size} guilds!`, type: 0 } });
    let embed = new Discord.RichEmbed()
      .setTitle('I have been restarted')
      .setColor('#ff7700')
      .setFooter('Restart', client.user.avatarURL)
      .setTimestamp(new Date());
    client.channels.get('331072865707360258').send({ embed });
    console.log(`┌────────────────────┐\n|Took: ${process.uptime() } seconds!|\n└────────────────────┘`);
  });
};

  exports.settings = {
    name: 'Ready',
    enabled: true,
  };