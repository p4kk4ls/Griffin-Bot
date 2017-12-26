const Discord = require('discord.js');

exports.run = async(client, message, args) =>{
  let number = args.join(' ');
  if (number <= 1) return message.channel.send('I need more messages to delete!');
  let messagecount = parseInt(number);
  await message.delete()
  await message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => {
    message.channel.bulkDelete(messages);
  });

  let embedDelete = new Discord.RichEmbed()
    .setAuthor(`Deleted ${number} messages`)
    .setColor(0x00AE86);
  await message.channel.send({embed: embedDelete}).then(botmsg => botmsg.delete(5000));
  return;
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: false,
  owneronly: false,
  permissionsRequired: ['MANAGE_MESSAGES'],
};

exports.help = {
  name: 'clear',
  description: '🔧 Clears a defined number of messages.',
  longDescription: "",
  usage: 'purge [number]'
};
