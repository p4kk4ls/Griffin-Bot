const Discord = require('discord.js');
const randomgen = require('random-natural');

exports.run = async(client, message, args) =>{
  var math = await randomgen({ min: args[0], max: args[1] });
  let embed = new Discord.RichEmbed()
    .setTitle(`🎲 You rolled ${math}!`)
    .setColor('#2563c6');
  console.log(args[0] +' ' + args[1]);
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
  name: 'roll',
  description: '🎲 Throws dice with the numbers specified.',
  longDescription: "",
  usage: 'roll [min] [max]'
};
