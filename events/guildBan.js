const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('guildBanAdd', (guild, user) => {
    if(user.bot)
      return;
    if(guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${user.tag} has been banned!`, user.avatarURL)
        .setDescription('For more info check the audit log')
        .setColor('#c4350d')
        .setFooter('Ban', client.user.avatarURL)
        .setTimestamp(new Date());
      guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
};

exports.help = {
  name:"User banned",
  description: "Triggered when somebody is banned"
}

exports.settings = {
      enabled: true,     
      public: true,
};