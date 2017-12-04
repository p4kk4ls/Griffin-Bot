const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('guildBanRemove', (guild, user) => {
    if(guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${user.name} has been unbanned!`, user.avatarURL)
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
  name:"User Unbanned",
  description: "Triggered when a user is unbanned"
}

exports.settings = {
      enabled: true,     
      public: true,
};