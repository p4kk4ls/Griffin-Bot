const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let userToBan = await message.mentions.users.first() || client.users.get(args[0]);

  let errorEmbed = new Discord.RichEmbed()
    .setAuthor("Missing arguments!!")
    .setDescription("kick [mention/userID] [reason]")
    .setColor('#f22a0c');

  if(!userToBan || !reason){
    message.channel.send(errorEmbed)
    return
  }

  if (!message.guild.member(userToBan).kickable) {
    let embed = new Discord.RichEmbed()
      .setTitle('This user is not kickable for me!')
      .setColor('#f22a0c')

    message.channel.send({embed}).then(botmsg => {botmsg.delete(5000)});
    return;
  }
  
  message.guild.member(userToBan).kick();
  message.delete()

  let embedModLog = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setTimestamp(new Date)
    .addField('Action', 'Kick', true)
    .addField('Moderator', message.author.tag, true)
    .addField('Target', userToBan.tag, true)
    .addField('Reason', reason, true)
    .setFooter(message.guild.name, message.guild.iconURL);

  let embedSmall = new Discord.RichEmbed()
    .setAuthor(`${userToBan.tag} has been kicked out! 👌 `, userToBan.displayAvatarURL)
    .setDescription('Hes gone for now...')
    .setColor('#00ff0c'); 



  if(message.guild.channels.find('name', 'mod-log')){ message.guild.channels.find('name', 'mod-log').send({embed:embedModLog}) }
  message.channel.send({ embed: embedSmall })
  client.users.get(userToBan.id).send({embed:embedModLog})
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: false,
  owneronly: false,
  permissionsRequired: ['KICK_MEMBERS'],
};

exports.help = {
  name: 'kick',
  description: '👞 Kicks the mentioned user.',
  longDescription: "",
  usage: 'kick [mention/userID] [reason]'
};
