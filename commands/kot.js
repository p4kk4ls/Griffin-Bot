const Discord = require('discord.js');
const catFacts = require('cat-facts');

exports.run = async(client, message) =>{
  var img = await randomCat.get();
  let fact = await catFacts.random();
    let embed = new Discord.RichEmbed()
      .setTitle('Cat fact and picture.')
      .setImage(img)
      .setColor('#ba881b')
      .setDescription(fact)
    message.channel.send({embed});
  return;
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'cat',
  description: '😺Tells you a cat fact.',
  longDescription: "",
  usage: 'cat'
};
