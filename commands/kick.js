const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();

  if(!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return message.channel.send('You dont have permissions ya twat!');

  if (reason.length < 1) {
    let embed = new Discord.RichEmbed()
      .setTitle('Specify a reason and user for a kick!')
      .setColor('#f22a0c')

    message.channel.send({embed}).then(botmsg => {botmsg.delete(5000)});
    return;
  }

  if (message.mentions.users.size < 1) {
    let embed = new Discord.RichEmbed()
      .setTitle('Please specify any mentions.')
      .setColor('#f22a0c')

    message.channel.send({embed}).then(botmsg => {botmsg.delete(5000)});
    return;
  }
  if (!message.guild.member(user).kickable) {
    let embed = new Discord.RichEmbed()
      .setTitle('This user is not kickable for me!')
      .setColor('#f22a0c')

    message.channel.send({embed}).then(botmsg => {botmsg.delete(5000)});
    return;
  }
  message.guild.member(user).kick();
  message.delete();

  //Embeds
  //Kicked PM
  const kickedPM = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('You have been kicked!!')
    .setColor('#ff0000')
    .setTimestamp(new Date)
    .addField('Action', 'Kick', true)
    .addField('Moderator', `${message.author.tag}`, true)
    .addField('Target', `${user.tag}`, true)
    .addField('Reason', `${reason}`, true)
    .setFooter('Kick', client.user.avatarURL);
  
  //Channel with Modlog
  const channelModLog = new Discord.RichEmbed()
    .setAuthor(`${message.author.username} kicked some ass and chewed bubblegum!`, message.author.avatarURL)
    .setColor(0x00AE86)
    .setTimestamp(new Date)
    .addField(`And ${user.tag} is gone`, 'Check mod-log for more info.', true);

  //No modlog
  const channelNoLog = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Copy of this message was sent to server owner!\nCreating a #mod-log channel is recomended!')
    .setColor(0x00AE86)
    .setTimestamp(new Date)
    .addField('Action', 'Kick', true)
    .addField('Moderator', `${message.author.tag}`, true)
    .addField('Target', `${user.tag}`, true)
    .addField('Reason', `${reason}`, true)
    .setFooter('Kick', client.user.avatarURL);

  //Basic Embed
  const embedBasic = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setTimestamp(new Date)
    .addField('Action', 'Kick', true)
    .addField('Moderator', `${message.author.tag}`, true)
    .addField('Target', `${user.tag}`, true)
    .addField('Reason', `${reason}`, true)
    .setFooter('Kick', client.user.avatarURL);

  if(message.guild.channels.find('name', 'mod-log')){
    message.channel.send({embed: channelModLog});
    client.users.get(user.id).send({embed: kickedPM});
    message.guild.channels.find('name', 'mod-log').send({embed: embedBasic});
  } else {
    message.channel.send({embed: channelNoLog});
    client.users.get(user.id).send({embed: kickedPM});
    message.guild.owner.send({embed: channelNoLog});
  }
};

exports.settings = {
  enabled: false,     
  public: false,
};

exports.help = {
  name: 'kick',
  description: '👞 Kicks the mentioned user.',
  usage: 'kick [mention] [reason]'
};
