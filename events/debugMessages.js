const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('warn', (warn) => {
    let embed = new Discord.RichEmbed()
      .setTitle('DISCORD API WARN')
      .setDescription('Log', warn)
      .setColor('#ff7700')
      .setFooter('warn')
      .setTimestamp(new Date());
    client.channels.get ('331072865707360258').send({ embed });
  });


  };

  exports.settings = {
    name: '',
    enabled: false,
  };