const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('guildMemberRemove', (member) => {
    let embed = new Discord.RichEmbed()
      .setAuthor(`${member.user.username} just left.`, member.user.displayAvatarURL)
      .setDescription('👋 Did we say something wrong?')
      .setColor('#c4350d');
    if (member.guild.channels.find('name', 'general')) {
      member.guild.channels.find('name', 'general').send({ embed });
      return;
    }
    if (member.guild.defaultChannel) {
      member.guild.defaultChannel.send({ embed });
      return;
    }
    if (member.guild.channels.find('name', 'mod-log')) {
      member.guild.channels.find('name', 'mod-log').send({ embed });
      return;
    }
    else
      return;
  });
};

  exports.settings = {
    name: '',
    enabled: false,
  };