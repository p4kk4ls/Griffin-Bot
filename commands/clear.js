const Discord = require('discord.js');

exports.run = (client, message, args) =>{
  let number = args.join(' ');
  if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.reply('You dont have permissions ya twat!');
  if (number.length < 1) return message.channel.send('I need more messages to delete!');
  let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => {
    message.channel.bulkDelete(messages);
  });
  let embedDelete = new Discord.RichEmbed()
    .setAuthor(`Deleted ${number} messages`)
    .setColor(0x00AE86);
  message.channel.send({embed: embedDelete}).then(botmsg => botmsg.delete(5000));
  message.delete();
  return;
};

exports.help = {
  name: 'clear',
  description: '🔧 Clears a defined number of messages.',
  usage: 'purge [number]'
};
