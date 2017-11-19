const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('channelCreate', (channel) => {
    if(channel.type == 'dm')
      return;
    if(channel.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Channel #${channel.name}(${channel.id}) has been created!`)
        .setDescription('For more info check the audit log')
        .addField('Type', `${channel.type }`)
        .setColor('#c4350d')
        .setFooter('Channel', client.user.avatarURL)
        .setTimestamp(new Date());
      channel.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
};

  exports.settings = {
    name: '',
    enabled: false,
  };