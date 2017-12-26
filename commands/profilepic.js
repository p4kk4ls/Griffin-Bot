const Discord = require('discord.js');

module.exports.run = (client, message, args) =>{
  let user = message.mentions.users.first() || client.users.get(args[0]) || message.author
    let finishedEmbed = new Discord.RichEmbed()
      .setAuthor('Link', user.displayAvatarURL,user.displayAvatarURL)
      .setColor('#1bba31')
      .setImage(user.displayAvatarURL);

    message.channel.send({embed: finishedEmbed})
}

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'profilepic',
  description: `🖨 Grabs mentioned user's profile pic.`,
  longDescription: "",
  usage: 'profilepic [mention]'
};