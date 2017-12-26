const Discord = require('discord.js');
exports.run = (client, message) =>{
  let giveCookieto = message.mentions.users.first();
  if(giveCookieto == message.author) return message.channel.send('No.');

  if (message.mentions.users.size < 1) { 
    let embed = new Discord.RichEmbed()
      .setTitle('You haven\'t said who\'s sandvich it is so i ate it.')
      .setColor('#683e0d')
      .setThumbnail('http://www.markrice.com/birds/2005images/20051211_0031%20PiperHubble%20Eating%20Sandwich.JPG');

    message.channel.send({embed});
    return;
  }

  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(`Sent you a sandvich ${giveCookieto.username}!`)
    .setColor('#683e0d')
    .setThumbnail('https://wiki.teamfortress.com/w/images/thumb/9/95/Sandvich.png/250px-Sandvich.png?t=20111211152033');
  message.channel.send({embed});
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'sandvich',
  description: '🍪 Gives mentioned user a sandvich.',
  longDescription: "",
  usage: 'sandvich [mention]'
};
