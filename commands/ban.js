const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let userToBan = message.mentions.users.first();

  if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.reply('You can\'t fool me! You dont have permissions!');

  if (reason.length < 1) {
    let embed = new Discord.RichEmbed()
      .setTitle('Specify a reason for a ban!')
      .setColor('#f22a0c')

    message.channel.send({embed});
    return;
  }

  if (message.mentions.users.size < 1) {
    let embed = new Discord.RichEmbed()
      .setTitle('Please specify any mentions or userID\'s!')
      .setColor('#f22a0c')

    message.channel.send({embed});
    return;
  }

  if (!message.guild.member(userToBan).bannable) {
    let embed = new Discord.RichEmbed()
      .setTitle('This user is not bannable for me!')
      .setColor('#f22a0c')

    message.channel.send({embed});
    return;
  }
  
  message.guild.ban(userToBan, reason);
  message.delete
//Embed Section
//Basic BANNED Embed
  const basicBan = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Copy of this message was sent to server owner and #mod-log!')
    .setColor(0x00AE86)
    .setTimestamp(new Date)
    .addField('Action', 'Ban', true)
    .addField('Moderator', `${message.author.tag}`, true)
    .addField('Target', `${userToBan.tag}`, true)
    .addField('Reason', `${reason}`, true)
    .setFooter('Ban', client.user.avatarURL);

//Banned PM
const BannedPM = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('You have been banned!!')
    .setColor('#ff0000')
    .setTimestamp(new Date)
    .addField('Action', 'Ban', true)
    .addField('Moderator', `${message.author.tag}`, true)
    .addField('Target', `${userToBan.tag}`, true)
    .addField('Reason', `${reason}`, true)
    .setFooter('Ban', client.user.avatarURL);

//Banned Channel
//With Mod=Log
 const channelModLog = new Discord.RichEmbed()
    .setAuthor(`${message.author.username} used BANHAMMER`, message.author.avatarURL)
    .setColor(0x00AE86)
    .setTimestamp(new Date)
    .addField(`And ${userToBan.tag} is gone`, `Check mod-log for more info.`, true)
    .setFooter('Ban', client.user.avatarURL);


  if(message.guild.channels.find('name', 'mod-log')){
    message.channel.send({embed: channelModLog})
    client.users.get(userToBan.id).send({embed: BannedPM});
    message.guild.channels.find('name', 'mod-log').send({embed: basicBan})
    message.guild.owner.send({embed: BannedPM});
  } else {
    message.channel.send({embed: basicBan});
    client.users.get(userToBan.id).send({embed: BannedPM});
    message.guild.owner.send({embed: basicBan});
  }
};
exports.help = {
  name: 'ban',
  description: '🔨 Unleash the banhammer!!',
  usage: 'ban [mention] [reason]'
};
