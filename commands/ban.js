const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let userToBan = await message.mentions.users.first() || client.users.get(args[0]);

  let errorEmbed = new Discord.RichEmbed()
    .setAuthor("Missing arguments!!")
    .setDescription("ban [mention/userID] [reason]")
    .setColor('#f22a0c');

  if(!userToBan || !reason){
    message.channel.send(errorEmbed)
    return
  }

  if (!message.guild.member(userToBan).bannable) {
    let embed = new Discord.RichEmbed()
      .setTitle('This user is not bannable for me!')
      .setColor('#f22a0c')

    message.channel.send({embed}).then(botmsg => {botmsg.delete(5000)});
    return;
  }
  
  message.guild.ban(userToBan, reason);
  message.delete()

  let embedModLog = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setTimestamp(new Date)
    .addField('Action', 'Ban', true)
    .addField('Moderator', message.author.tag, true)
    .addField('Target', userToBan.tag, true)
    .addField('Reason', reason, true)
    .setFooter(message.guild.name, message.guild.iconURL);

  let embedSmall = new Discord.RichEmbed()
    .setAuthor(`${userToBan.tag} has been banned! 👌 `, userToBan.displayAvatarURL)
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
  permissionsRequired: ['BAN_MEMBERS'],
};

exports.help = {
  name: 'ban',
  description: '🔨 Unleash the hammer!!',
  longDescription: "",
  usage: 'ban [mention/userID] [reason]'
};
