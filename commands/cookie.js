const Discord = require('discord.js');
exports.run = (client, message, args) =>{
  let giveCookieto = message.mentions.users.first();
  if(giveCookieto == message.author) return message.channel.send('Loser!');

  if (message.mentions.users.size < 1) { 
    let embed = new Discord.RichEmbed()
      .setTitle('You havent said who\'s cookie it is so i ate it.')
      .setColor('#683e0d')
      .setThumbnail('http://www.markrice.com/birds/2005images/20051211_0031%20PiperHubble%20Eating%20Sandwich.JPG');

    message.channel.send({embed});
    return;
  }

  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(`Sent you a cookie ${giveCookieto.username}!`)
    .setColor('#683e0d')
    .setThumbnail('https://wiki.teamfortress.com/w/images/thumb/9/95/Sandvich.png');
  message.channel.send({embed});
};

exports.help = {
  name: 'sandvich',
  description: '🍪 Gives mentioned user a sandvich.',
  usage: 'sandvich [mention]'
};
