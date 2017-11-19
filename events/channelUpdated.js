const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('channelUpdate', (oldChannel, newChannel) => {
    if(newChannel.type == 'dm')
      return;
    if(oldChannel.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Channel #${oldChannel.name} | #${newChannel.name} has been updated!`)
        .setDescription('For more info check the audit log')
        .addField('Type', `${oldChannel.type }`, true)
        .addField('ID', `${oldChannel.id}`, true)
        .setColor('#c4350d')
        .setFooter('Channel', client.user.avatarURL)
        .setTimestamp(new Date());
      oldChannel.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
};

  exports.settings = {
    name: '',
    enabled: true,
  };