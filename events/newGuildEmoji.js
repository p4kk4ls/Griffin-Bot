const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('emojiCreate', (emoji) => {
    if(emoji.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor('Emoji has been created!')
        .setDescription(`${emoji}\nFor more info check the audit log`)
        .setColor('#c4350d')
        .setThumbnail(emoji.url)
        .setFooter('Emoji', client.user.avatarURL)
        .setTimestamp(new Date());
      emoji.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
};

exports.help = {
  name:"New emoji",
  description: "Triggered when emoji is added"
}

exports.settings = {
      enabled: true,     
      public: true,
};